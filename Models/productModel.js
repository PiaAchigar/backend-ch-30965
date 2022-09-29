const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    code: { type: String },
    photo_url: { type: String },
    price: { type: Number },
    stock: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
//module.exports = { productModel, productSchema };
//module.exports = productModel;

//   name: { type: String, required: true },
//   price: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   createdAt: { type: Date, required: true },
//   thumbnail: { type: String, required: true },
