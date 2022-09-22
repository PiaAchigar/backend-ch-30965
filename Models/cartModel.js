const { Schema, model } = require("mongoose");
const { ProductSchema } = require("./productModel");

const cartSchema = new Schema(
  {
    products: [ProductSchema],
    user_id: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
