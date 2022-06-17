//Knex
const { options } = require("./db/mysql");
const knex = require("knex")(options);

//Tabla : id, title, price, thumbnail
//Para poder usar ésta clase la tabla ya tiene q estar previamente creada... la creo acá adentro o antes de instanciar ésta clase??
//Como pruebo ésto?
class Contenedor {
  constructor(objKnex, tableName) {
    this.objKnex = objKnex;
    this.tableName = tableName;
  }
  async getAll() {
    this.objKnex
      .from(tableName)
      .select("*")
      .then((products) => {
        console.log({ products });
        return products;
      })
      .catch((err) => console.log(`Error: ${err.message}`))
      .finally(() => this.objKnex.destroy());
  }

  async save(objProduct) {
    this.objKnex
      .insert(objProduct)
      .then(() => {
        //acá tengo q retornar el id que no se como hacerlo
        console.log("Producto insertado");
      })
      .catch((err) => console.log(`Error: ${err.message}`))
      .finally(() => this.objKnex.destroy());
  }
  async getById(idProd) {
    this.objKnex.from(this.tableName),
      select("*")
        .where("id", "=", idProd) // es lo mismo que poner where({id:idProd}) ??
        .then((products) => {
          //Aca tengo q hacer el return products, no?
          console.log({ products });
        })
        .catch((err) => console.log(`Error: ${err.message}`))
        .finally(() => this.objKnex.destroy());
  }
  async deleteById(idProd) {
    this.objKnex
      .from(tableName)
      .where("id", idProd)
      .del()
      .then((products) => {
        console.log(`Productos eliminados: ${products}`);
      })
      .catch((err) => console.log(`Error: ${err.message}`))
      .finally(() => this.objKnex.destroy());
  }
  async deleteAll() {
    objKnex
      .from(tableName)
      .del()
      .then((products) => {
        console.log(`Productos eliminados: ${products}`);
      })
      .catch((err) => console.log(`Error: ${err.message}`))
      .finally(() => this.objKnex.destroy());
  }
}
module.exports = Contenedor;
