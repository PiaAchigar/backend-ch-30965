const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    photo_url: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel, productSchema };
//module.exports = productModel;

// name: { type: String, required: true },
//   price: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   createdAt: { type: Date, required: true },
