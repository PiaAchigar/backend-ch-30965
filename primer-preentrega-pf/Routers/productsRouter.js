const express = require("express");
const { Router } = express;
const Contenedor = require("../Container");
const cont = new Contenedor("products.txt");


const productosRouter = Router();

productosRouter.get("/api/productos", async (req, res) => {
  try {
    const arrayData = await cont.getAll();
    res.json(arrayData);
  } catch (e) {
    console.log("Error en getAll: ", e);
  }
});

//get segun su id
productosRouter.get("/api/productos/:id", async (req, res) => {
  try {
    const obj = await cont.getById(req.params.id);
    obj ? res.json(obj) : res.json({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

productosRouter.post("/api/productos", async (req, res) => {
  try {
    const producto = req.body;
    const newId = await cont.save(producto);
    return res.status(201).json(newId);
  } catch (e) {
    console.log("Error de IIFE-save", e);
  }

});

productosRouter.put("/api/productos/:id", async (req, res) => {
  try {
    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    let obj = await cont.getById(req.params.id);
    if (obj) {
      let now = new Date().now;
      obj.timestamp = now;
      obj.nombre = req.body.nombre;
      obj.descripcion = req.body.descripcion;
      obj.codigo = req.body.codigo;
      obj.foto = req.body.foto;
      obj.precio = req.body.precio;
      obj.stock = req.body.stock;

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
    const producto = await cont.deleteById(req.params.id);
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
