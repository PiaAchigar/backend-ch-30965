//usamos la librería mongoose
//la data me la mandan desde el front o API para guardar
class ContenedorMongoDb {
  constructor(model, table) {
    this.db = require("../../mongodb");
    //this.data = new model();
  }
  findAll() {
    return this.db; //acá la coexion tb queda abierta?
  }
  find(id) {}

  create(data) {
    return this.db
      .then((_) => model(data).save())
      .then((doc) => console.log("Docu guarado", doc))
      .catch((e) => console.error(`Error: ${e}`))
      .finally((_) => process.exit());
  }
  update(id, data) {}
  delete(id) {}
}
module.exports = ContenedorMongoDb;
