const { Schema, model } = require("mongoose");

const userSchema = Schema({
  email: { type: String, required: true },
  //email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
});

module.exports = model("User", userSchema);

// name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, required: true },
/*
name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: Number, required: true },
  photo_url: { type: String },
  cart_id: { type: mongoose.Schema.ObjectId },
*/
