const { Product } = require("../models/product")

exports.post_classification = async (req, res) => {
    const { name, description, category, image, location, postedAt, price } = req.body;
    try {
        const newPost = new Product({ name, description, category, image, location, postedAt, price });
        await newPost.save();
        return res.status(201).send({ meassage: "POST created sucessfully", "post": newPost })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ error:true, message: "Internal Server Error" })
    }
}

exports.DeletePost=async(req,res)=>{
    let id = req.params.id
    console.log(id);
    const exist = await Product.findOne({"_id":id});
    if(!exist){
         return res.status(401).send({ message: "POST allredy deleted from OLX" })
    }else{
        try {
            await Product.findOneAndDelete({ "_id": id })
            return res.status(202).send({ message: "POST deleted successfully" })
        } catch (error) {
            console.log(error)
            res.status(400).send({ "err": "Somthing went wrong" })
        } 
    }
}


exports.browse_classifieds = async (req, res) => {
    
    try {
        const page = parseInt(req.query.page)-1||0;
        const limit = parseInt(req.query.limit)||10;
        const search = req.query.search||"";
        let sort = req.query.sort||"postedAt";
        let category = req.query.category||"All"
        const categoryOption = [
            "electronics","clothing","furniture","others"
        ];
        category=="All"?(category=[...categoryOption]):(category=req.query.category.split(","));
        req.query.sort?(sort=req.query.sort.split(",")):(sort=[sort]);
        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]]=sort[1];
        }else{
            sortBy[sort[0]]="asc"
        }

        const post = await Product.find({name:{$regex:search,$options:"i"}}).where("category").in([...category]).sort(sortBy).skip(page*limit).limit(limit);
        const total = await Product.countDocuments({
            category:{$in:[...category]},
            name:{$regex:search,$options:"i"},
        });
        const response = {
            error:false,
            total,page:page+1,
            limit,
            category:categoryOption,
            post
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send({error:true, message: "Internal Server Error" })
    }
}