const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");
class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("../../../models-mongoose/products", "products");
  }
}
module.exports = ProductosDaoMongoDB;
