const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: [true, "Price must be provided"] },
  description: { type: String, default: true },
  category: { type: String, default: true },
  image:{ type: String, default: true },
  location:{ type: String, default: true },
  postedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Product",productSchema);