const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
