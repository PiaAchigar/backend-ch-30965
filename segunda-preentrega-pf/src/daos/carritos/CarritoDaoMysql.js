const ContenedoeMySQL = require("../../contenedores/ContenedorMysql");
const options = require("../../../mysql");
class CarritoDaoMysql extends ContenedoeMySQL {
  constructor() {
    super(options, "carrito");
  }
}
module.exports = CarritoDaoMysql;
