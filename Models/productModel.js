const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
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

module.exports = model("Product", ProductSchema);
//module.exports = { productModel, productSchema };
//module.exports = productModel;

//   name: { type: String, required: true },
//   price: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   createdAt: { type: Date, required: true },
//   thumbnail: { type: String, required: true },
