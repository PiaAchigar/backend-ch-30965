//conexion a MongoDB Atlas - clase20 min 26
const mongoose = require("mongoose");

//const URL = "mongodb://127.0.0.1:27017/segundaPreEntrega";
const URL ="mongodb+srv://pia:farma1142@cluster0.5z86n.mongodb.net/?retryWrites=true&w=majority";
const connection = mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((_) => console.log("Conectado a la base de datos de MongoDB Atlas"));

module.exports = connection;


