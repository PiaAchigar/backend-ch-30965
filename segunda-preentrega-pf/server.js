//levanto mi servidor
const express = require("express");
const app = express();
const productsRouter = require("./src/routers/productsRouter");
const cartsRouter = require("./src/routers/cartsRouter");
const error404Middleware = require("./middlewares/error404Middlewaere");
const DataBaseMongo = require("./mongodb");
if (process.env.STORAGE === "mongodb") DataBaseMongo.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
//404
app.use(error404Middleware);
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en puerto ${PORT}`);
});
server.on("error", (error) => console.log(` Se produjo un error ${error}`));
