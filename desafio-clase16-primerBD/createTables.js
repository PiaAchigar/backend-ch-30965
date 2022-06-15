const { options } = require("./db/mysql");
const knex = require("knex")(options);

//Creamos nuestra tabla
knex.schema
  .createTable("categories", (table) => {
    table.increments("id");
    table.string("name", 30);
  })
  .then(() => {
    console.log("Tabla categories está creada");
    return knex.schema.createTable("products", (table) => {
      //indico todos los campos y sus TD
      table.increments("id");
      table.string("name", 30);
      table.float("price");
      table.string("description", 255);
      table.integer("stock");
      table.integer("category_id").unsigned().references("categories.id"); // éste va a ser la clave foranea, tengo q asegurarme q sea del mismo tipo que en la otra tabla
      //le digo q es un entero sin signo con "unsigned()" y que referencia la tabla . y el campo(id)
    });
  })
  .then(() => {
    console.log("Tabla de productos creada");
  })
  .catch((e) => {
    console.log(`Error en la creacion de las tablas, e: ${e.message}`);
  })
  .finally(() => knex.destroy());
