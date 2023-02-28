
require("dotenv").config();
const express = require('express');
const app = express();
const connectDB = require("./db/connect")
const products_routes = require("./routes/products")
app.get("/",(req,res)=>{
    res.send("Home Page");
})
// middleware or to set router
app.use("/api/products",products_routes);
const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL); 
        app.listen(process.env.PORT, ()=>{
            console.log(`${process.env.PORT} YES I am connected`);
        })
    }catch(error){
        console.log(error)
    }
}
start();