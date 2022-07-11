//{"nombre":"jeje","descripcion":"hola","codigo":123456,"foto":"..","precio":200,"stock":5,"id":2,"timestamp":1654875988627}
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 500 },
  code: { type: String, required: true, max: 100, unique: true },
  img: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  id: { type: Number, required: true, max: 10 },
});

module.exports = model("Products", userSchema);
