//{"id":1,"productos":[{"id":2,"nombre":"producto2"}]}
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  products: { type: Array, required: true },
  id: { type: Number, required: true, max: 10 },
});

module.exports = model("Cart", userSchema);
