const express = require("express");
const { Router } = express;

let productos = [
  {
    title: "Escuadra",
    price: 200,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
    id: 1,
  },
  {
    title: "Regla",
    price: 110,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
    id: 2,
  },
  {
    title: "Calculadora",
    price: 750,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 3,
  },
];

const productosRouter = Router();

productosRouter.get("/api/productos", async (req, res) => {
  res.send({ Productos: productos });
});

productosRouter.get("/api/productos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);
  producto
    ? res.send({ Producto: producto })
    : res.send({ error: "Producto no encontrado" });
});

productosRouter.post("/api/productos", async (req, res) => {
  const producto = req.body;
  const id = productos.length + 1;
  productoNuevo = { id: id, ...producto };
  productos.push(productoNuevo);
  res.send({ "Nuevo Producto": productoNuevo });
});

productosRouter.put("/api/productos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const productoIndex = productos.findIndex((producto) => producto.id === id);
  if (productoIndex === -1) {
    res.send({ error: "Producto no encontrado" });
  } else {
    productos[productoIndex].title = req.body.title;
    productos[productoIndex].price = req.body.price;
    productos[productoIndex].thumbnail = req.body.thumbnail;

    res.json(productos[productoIndex]);
  }
});

productosRouter.delete("/api/productos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);
  const productosDelete = productos.filter((p) => p.id !== id);
  producto
    ? res.send({ Productos: productosDelete })
    : res.send({ error: "Producto no encontrado" });
});

module.exports = productosRouter;
