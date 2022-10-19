const mongoose = require("mongoose");

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;

//Ver video de Leifer Mendez - Crea una rest api escalable y sostenible con ty y express - min 32 conexion a Mongo