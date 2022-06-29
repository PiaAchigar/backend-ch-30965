class ContenedorMysql {
  constructor(options, table) {
    //name se refiere al nombre del archivo
    this.knex = require("knex")(options);
    this.table = table;
  }
  findAll() {
    return this.knex
      .from(this.table)
      .select("*")
      .then((items) => {
        console.log(items);
        return items;
      });
    //.catch((err) => console.log(`Error: ${err.message}`))// sifalla lo agarra el controlador
    //.finally(() => knex.destroy()); //necesito q la coneccion quee abierta
  }
  find(id) {}

  create(data) {
    return this.knex(this.table).insert(data);
  }
  update(id, data) {}
  delete(id) {}
}
module.exports = ContenedorMysql;
