const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
class CarritoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("../../../models-mongoose/cart", "cart");
  }
}
module.exports = CarritoDaoMongoDB;
