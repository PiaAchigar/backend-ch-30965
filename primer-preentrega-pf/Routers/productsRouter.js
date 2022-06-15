const express = require("express");
const { Router } = express;
//const Contenedor = require("../Container");
const Contenedor = require("../CartPersist");
const cont = new Contenedor("cart.txt", "products.txt");

const productosRouter = Router();

productosRouter.get("/api/productos", async (req, res) => {
  try {
    const arrayData = await cont.getAllProducts();
    res.json(arrayData);
  } catch (e) {
    console.log("Error en getAll: ", e);
  }
});

//get segun su id
productosRouter.get("/api/productos/:id", async (req, res) => {
  try {
    const obj = await cont.getByIdProduct(req.params.id);
    obj ? res.json(obj) : res.json({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

productosRouter.post("/api/productos", async (req, res) => {
  try {
    const producto = req.body;
    const newId = await cont.saveProduct(producto);
    return res.status(201).json(newId);
  } catch (e) {
    console.log("Error de IIFE-save", e);
  }
});

productosRouter.put("/api/productos/:id", async (req, res) => {
  try {
    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    let obj = await cont.getByIdProduct(req.params.id);
    if (obj) {
      await cont.deleteByIdProduct(req.params.id); // ojo que lo elimino, sino cargatodo, se carga vacio
      //let now = new Date().now; se lo agrego cuando lo guardo
      obj.nombre = req.body.nombre;
      obj.descripcion = req.body.descripcion;
      obj.codigo = req.body.codigo;
      obj.foto = req.body.foto;
      obj.precio = req.body.precio;
      obj.stock = req.body.stock;
      await cont.saveProduct(obj);
      res.json(obj);
    } else {
      res.send({ error: "Producto no encontrado" });
    }
  } catch (e) {
    console.log("Error de IIFE", e);
  }
});

productosRouter.delete("/api/productos/:id", async (req, res) => {
  try {
    const producto = await cont.deleteByIdProducto(req.params.id);
    console.log({ producto });
    producto
      ? res.send({ Productos: productosDelete })
      : res.send({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error de IIFE-delete", e);
  }
});
module.exports = productosRouter;

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
