const ContenedoeMySQL = require("../../contenedores/ContenedorMysql");
const options = require("../../../mysql");
class ProductosDaoMysql extends ContenedoeMySQL {
  constructor() {
    super(options, "products");
  }
}
module.exports = ProductosDaoMysql;
