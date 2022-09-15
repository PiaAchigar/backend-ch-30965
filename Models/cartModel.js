const mongoose = require("mongoose");
const { productSchema } = require("./productModel");

const cartSchema = new mongoose.Schema(
  {
    products: [productSchema],
    user_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
