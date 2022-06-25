const express = require("express");
const { Router } = express;
const ContenedorArchivo = require("../contenedores/ContenedorArchivo");
const contenedorArchivoCarritos = new ContenedorArchivo("./carts.json");

const cartsRouter = Router();

cartsRouter.get("", (req, res) => {
  return contenedorArchivoCarritos.findAll().then((carts) => {
    console.log({ carts });
    res.json(carts);
  });
});

//get segun su id
cartsRouter.get("/api/products/:id", async (req, res) => {
  try {
    const obj = await cont.getByIdProduct(req.params.id);
    obj ? res.json(obj) : res.json({ error: "Producto no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

cartsRouter.post("", (req, res) => {
  const data = req.body;
  return contenedorArchivoCarritos.create(data).then((newCart) => {
    console.log(newCart);
    return res.status(201).json(newCart);
  });
});

cartsRouter.put("/api/products/:id", async (req, res) => {
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

cartsRouter.delete("/api/products/:id", async (req, res) => {
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
module.exports = cartsRouter;
