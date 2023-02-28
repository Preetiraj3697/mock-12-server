const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: [true, "Price must be provided"] },
  description: { type: String, default: true },
  category: { type: String, default: true },
  image:{ type: String, default: true },
  location:{ type: String, default: true },
  postedAt: { type: String, default: Date.now() },
});

const Product = mongoose.model("Product", productSchema)

module.exports = {Product};