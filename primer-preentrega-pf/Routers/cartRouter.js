const express = require("express");
const { Router } = express;
const Contenedor = require("../CartPersist");
const contCart = new Contenedor("cart.txt");

const cartRouter = Router();

//id, timestamp(carrito), productos: { id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }
cartRouter.get("/api/carrito", async (req, res) => {
  try {
    const arrayData = await contCart.getAll();
    res.json(arrayData);
  } catch (e) {
    console.log("Error en getAll: ", e);
  }
});


cartRouter.get("/api/carrito/:id", async (req, res) => {
  try {
    const obj = await contCart.getById(req.params.id);
    obj ? res.json(obj) : res.json({ error: "Carrito no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

//middleware para el admin para
//app.use()

//crea un carrito y devuelve si id
cartRouter.post("/api/carrito", async (req, res) => {
  try {
    const newId = await contCart.newCart();
    return res.status(201).json(newId);
  } catch (e) {
    console.log("Error de IIFE-save", e);
  }
});

cartRouter.put("/api/productos/:id", async (req, res) => {
  try {
    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    let obj = await contCart.getById(req.params.id);
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

cartRouter.delete("/api/carrito/:id", async (req, res) => {
  try {
    const producto = await contCart.deleteByIdCart(req.params.id);
    console.log({ producto });
    producto
      ? res.send({ Productos: productosDelete })
      : res.send({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error de IIFE-delete", e);
  }
});
module.exports = cartRouter;
