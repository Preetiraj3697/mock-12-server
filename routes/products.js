const express= require("express");
const { browse_classifieds, post_classification, DeletePost } = require("../controller/post.controller");
const router= express.Router();

router.route("/add/product").post(post_classification)
router.route("/product").get(browse_classifieds)
router.route("/add/product/:id").delete(DeletePost);

module.exports=router