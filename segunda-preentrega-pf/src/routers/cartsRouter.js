const express = require("express");
const { Router } = express;
const storage = require("../daos"); //no hace falta que especifique index.js porque es el que busca por defecto
const carritosStorage = storage().carrito; //voy a usar la propiedad producto del obj que storage me devuelve
//es lo mismo que poner :   const { carrito : carritoStorage } = require("../daos")()

//const ContenedorArchivo = require("../contenedores/ContenedorArchivo");
//const CarritoDAOArchivo = require("../contenedores/CarritoDaoArchivo");//lo cambiamos por carritoStorage
//const contenedorArchivoCarritos = new ContenedorArchivo();
//const carritosDAO = new CarritoDAOArchivo(); // lo abstraigo más aún con el storage

const cartsRouter = Router();

//get segun id del cart, todos los productos
cartsRouter.get("/:id/products", async (req, res) => {
  return carritosStorage.getCartProducts(req.params.id).then((products) => {
    res.json(products);
  });
});

cartsRouter.post("/", async (req, res) => {
  const data = req.body;
  return carritosStorage.create(data).then((newCart) => {
    console.log(newCart);
    return res.status(201).json(newCart);
  });
});

cartsRouter.put("/:id/productos", async (req, res) => {
  return carritosStorage
    .addCartProduct(req.params.id, req.body)
    .then((_) => res.sendStatus(204));
});

cartsRouter.delete("/:id", async (req, res) => {
  return carritosStorage.delete(req.params.id).then((_) => res.sendStatus(204));
});

cartsRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  return carritosStorage
    .deleteCartProduct(req.params.id, req.params.id_prod)
    .then((_) => res.sendStatus(204));
});
module.exports = cartsRouter;
