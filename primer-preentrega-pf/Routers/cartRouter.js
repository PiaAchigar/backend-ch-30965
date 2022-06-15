const express = require("express");
const { Router } = express;
const Contenedor = require("../CartPersist");
const contCart = new Contenedor("cart.txt", "products.txt");

const cartRouter = Router();

//id, timestamp(carrito), productos: [{ id, timestamp(producto), nombre, descripcion, código, foto (url), precio, stock }]
cartRouter.get("/api/carrito", async (req, res) => {
  try {
    const arrayData = await contCart.getAllCarts();
    res.json(arrayData);
  } catch (e) {
    console.log("Error en getAll: ", e);
  }
});

cartRouter.get("/api/carrito/:id", async (req, res) => {
  try {
    const obj = await contCart.getByIdCart(req.params.id);
    console.log({ obj });
    obj
      ? res.json(obj) // o res.json(obj.productos)
      : res.json({ error: "Carrito no encontrado" });
  } catch (e) {
    console.log("Error en getById: ", e);
  }
});

//Creo el carrito y devuelvo el id
cartRouter.post("/api/carrito", async (req, res) => {
  try {
    const cartId = await contCart.newCart();
    return res.status(201).json(cartId);
  } catch (e) {
    console.log("Error de IIFE-save", e);
  }
});

//pusheo un producto al carrito x - viene el idcart y el objProducto por el body
cartRouter.post("/api/carrito", async (req, res) => {
  try {
    const cart = await contCart.getByIdCart(req.body.id); //tengo mi carrito
    console.log({ cart });
    const producto = await contCart.getByIdProduct(req.body.idProd); //tengo el id del producto seleccionado
    const isThere = cart.productos.some((p) => {
      //consulto si ya esta en el carrito
      p.id == req.body.id;
    });
    isThere
      ? (producto.unidades = producto.unidades + 1) //si ya esta le sumo uno
      : cart.productos.push(producto); //sino esta lo pusheo

    return res.status(201).json(cart);
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
//Delete 1 producto de 1 carrito especifico
cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    contCart.deleteAProductInCart(id, req.params.id_prod);
  } catch (e) {
    console.log("Error de IIFE-delete", e);
  }
});

//Agrego un producto a un carrito en particular, id del carrito por params, y el id del producto por body
cartRouter.post("/api/carrito/:id/productos", async (req, res) => {
  try {
    const idCart = req.params.id;
    const idProd = req.body.idProd;

    contCart.agregarProdACarrito(idCart, idProd);

    return res.status(201).json(`producto agregando en carrito ${idCart}`);
  } catch (e) {
    console.log(
      "Error en POST del del guardado de un producto en un carrito",
      e
    );
  }
});

module.exports = cartRouter;
