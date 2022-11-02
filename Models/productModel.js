const { Schema, model } = require("mongoose");
//Acá tengo que llamar a crypto para generar el nuevo id??
const ProductSchema = new Schema(
  {
    title: { type: String },
    price: { type: Number },
    thumbnail: { type: String },
    
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