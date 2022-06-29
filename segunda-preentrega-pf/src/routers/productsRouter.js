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

productsRouter.get("", (req, res) => {
  // return productosDAO.findAll().then((products) => {
  return productsStorage.findAll().then((products) => {
    console.log({ products });
    res.json(products);
  });
  //   try {
  //     const arrayData = await cont.getAllProducts();
  //     res.json(arrayData);
  //   } catch (e) {
  //     console.log("Error en getAll: ", e);
  //   }
});

//get segun su id
productsRouter.get("/api/products/:id", async (req, res) => {
  //hacer
  // try {
  //   const obj = await cont.getByIdProduct(req.params.id);
  //   obj ? res.json(obj) : res.json({ error: "Producto no encontrado" });
  // } catch (e) {
  //   console.log("Error en getById: ", e);
  // }
});

productsRouter.post("", (req, res) => {
  const data = req.body;
  return productsStorage.create(data).then((newProd) => {
    console.log(newProd);
    return res.status(201).json(newProd);
  });

  //   try {
  //     const producto = req.body;
  //     const newId = await cont.saveProduct(producto);
  //     return res.status(201).json(newId);
  //   } catch (e) {
  //     console.log("Error de IIFE-save", e);
  //   }
});

productsRouter.put("/api/products/:id", async (req, res) => {
  //hacer
  // try {
  //   //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
  //   let obj = await cont.getByIdProduct(req.params.id);
  //   if (obj) {
  //     await cont.deleteByIdProduct(req.params.id); // ojo que lo elimino, sino cargatodo, se carga vacio
  //     //let now = new Date().now; se lo agrego cuando lo guardo
  //     obj.nombre = req.body.nombre;
  //     obj.descripcion = req.body.descripcion;
  //     obj.codigo = req.body.codigo;
  //     obj.foto = req.body.foto;
  //     obj.precio = req.body.precio;
  //     obj.stock = req.body.stock;
  //     await cont.saveProduct(obj);
  //     res.json(obj);
  //   } else {
  //     res.send({ error: "Producto no encontrado" });
  //   }
  // } catch (e) {
  //   console.log("Error de IIFE", e);
  // }
});

productsRouter.delete("/api/products/:id", async (req, res) => {
  //hacer
  // try {
  //   const producto = await cont.deleteByIdProducto(req.params.id);
  //   console.log({ producto });
  //   producto
  //     ? res.send({ Productos: productosDelete })
  //     : res.send({ error: "Producto no encontrado" });
  // } catch (e) {
  //   console.log("Error de IIFE-delete", e);
  // }
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
