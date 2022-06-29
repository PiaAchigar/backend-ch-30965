//class con herencia
const ContenedoeArchivo = require("../../contenedores/ContenedorArchivo");
class ProductosDaoArchivo extends ContenedoeArchivo {
  constructor() {
    super("./products.json");
  }
}
module.exports = ProductosDaoArchivo;
