const ContenedoeArchivo = require("../../contenedores/ContenedorArchivo");
class CarritoDaoArchivo extends ContenedoeArchivo {
  constructor() {
    super("./carts.json");
  }
}
module.exports = CarritoDaoArchivo;
