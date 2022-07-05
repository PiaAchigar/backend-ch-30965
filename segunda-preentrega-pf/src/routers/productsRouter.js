//defino mi router y sus rutas productRouter.get("/"")
//delegar la logica de la creacion de nuestros productos a los Contenedores
//acá requiero mi contenedor de archicos generico
//Éstos Routers son los unicoq ue saben quien se va a estar ejecutando
//todo:
//ruta de crear producto
//ruta de leer producto
//exporto el modulo lo requiero en el server.js
const express = require("express");
const { Router } = express;

//esto de DAO tb se lo conoce como el patron repositorio
const storage = require("../daos"); //no hace falta que especifique index.js porque es el que busca por defecto
const productsStorage = storage().products; //voy a usar la propiedad producto del obj que storage me devuelve
//const Contenedor = require("../Container");
//const ContenedorArchivo = require("../contenedores/ContenedorArchivo");
//const ContenedorMySQL = require("../contenedores/ContenedorMySQL");
//const ProductosDAOArchivo = require("../daos/productos/ProductosDaoArchivo");

// const options = {
//   client: "mysql",
//   connection: {
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "ecommerce",
//   },
// };

//const contenedorArchivoProductos = new ContenedorArchivo("./products.json"); //voy cambiando en los Routers los conenedores a los que voy a llamar segun la persistencia con la que esté trabajando.
//const productosDAO = new ProductosDAOArchivo(); //una capa más de abstracción, me conecto al archivo a traves de un DAO, que la cambio por el
//productsStorage
//const contenedorMySQLProducts = new ContenedorMySQL(options, "products");

const productsRouter = Router();
const isAdmin = require("../../middlewares/isAdminMiddleware");

//get segun si trae o no id
productsRouter.get("/:id?", async (req, res) => {
  if (req.params.id) {
    return productsStorage
      .find(req.params.id)
      .then((products) => res.json(products));
  }
  return res.json(await productsStorage.findAll());
});

productsRouter.post("/", isAdmin, async (req, res) => {
  const data = req.body;
  return productsStorage.create(data).then((newProd) => {
    console.log(newProd);
    return res.status(201).json(newProd);
  });
});

productsRouter.put("/:id", isAdmin, async (req, res) => {
  return productsStorage
    .update(req.params.id, req.body)
    .then((_) => res.sendStatus(204))
    .catch((e) => console.log(e));
});

productsRouter.delete("/:id", isAdmin, async (req, res) => {
  return productsStorage
    .delete(req.params.id)
    .then((_) => res.sendStatus(204))
    .catch((e) => console.log(e));
});
module.exports = productsRouter;

//ejemplo de POST de un producto
//timestamp, nombre, descripcion, código, foto (url), precio, stock.
// let archivo = new Contenedor();
// const objPerfu = {
//   timestamp: "",
//   nombre: "Good Girl",
//   descripcion: "Perfume de mujer",
//   codigo: 77894578,
//   foto: "",
//   precio: 10000,
//   stock: 5,
// };
