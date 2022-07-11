//usamos la librería mongoose
//la data me la mandan desde el front o API para guardar
class ContenedorMongoDb {
  //Modelo es la representacion de nuestra collection
  constructor(model, db) {
    //this.db = require("../../mongodb"); se lo paso cuando instancie la clase
    // model es un metdo que me normaliza la dataCualquiera a data para enviar
    //this.data = new model(); ??
    this.db = db;
    this.model = model;
  }
  //READ
  findAll() {
    return this.db
      .then((_) => this.model.find({})) 
      .then((docs) => console.log(docs))
      .catch((e) => console.error(`Error: ${e}`))
      .finally((_) => process.exit());
    //acá la coexion tb queda abierta?
  }
  find(id) {
    return this.db
      .then((_) => this.model.findById(id)) //es lo mismo que findOne({ _id: id })
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => console.error(`Error: ${err.message}`))
      .finally((_) => process.exit());
  }
  //CREATE
  create(data) {
    return this.db
      .then((_) => this.model(data).save()) //tb se puede hacer con insertMany??
      .then((doc) => console.log("Docu guarado", doc))
      .catch((e) => console.error(`Error: ${e}`))
      .finally((_) => process.exit());
  }

  update(id, data) {
    //1 update solo
    this.db
      .then((_) => {
        //varios- updateMany
        return this.model.updateOne(
          { _id: id },
          {
            $set: { data },
          }
        );
      })
      .then((doc) => console.log(doc))
      .catch((err) => console.error(`Error: ${err.message}`))
      .finally((_) => process.exit());
    //2  read/update
    // return this.db
    //   .then((_) => model.findById(id)) //es lo mismo que findOne({ _id: id })
    //   .then((doc) => {
    //     console.log(doc);
    //     doc.updateOne(data);
    //     //user.password = "hola";
    //     return user.save();
    //   })
    //   .then((doc) => console.log(doc))
    //   .catch((err) => console.error(`Error: ${err.message}`))
    //   .finally((_) => process.exit());
  }
  delete(id) {
    return this.db
      .then((_) => this.model.deleteOne({ _id: id }))
      .then((doc) => console.log(doc))
      .catch((err) => console.error(`Error: ${err.message}`))
      .finally((_) => process.exit());
  }
}
module.exports = ContenedorMongoDb;
