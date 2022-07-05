const db = require("../../../firebase/firebase");
const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");

const query = db.collection("products");

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(query);
  }
}

module.exports = ProductosDaoFirebase;
