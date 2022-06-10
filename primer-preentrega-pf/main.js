const express = require("express");
const app = express();
const productsRouter = require("./Routers/productsRouter");
const cartRouter = require("./Routers/cartRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let admin = true; // variable booleana para el login

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en puerto ${PORT}`);
});
server.on("error", (error) => console.log(` Se produjo un error ${error}`));

//dispongo publicamente la carpeta publicamente, no hace falta especificarle el index.html, lo va a buscar por defecto
app.use("/", express.static(__dirname + "/public"));

//tengo que crear la fn middleware que discrimina entre admin y usus
// const middlewareAdmin = (res, rej, next) => {
//   if (admin) {
//     res.send({});
//     next();
//   } else {
//     rej.send();
//   }
// };

// me traigo la ruta
app.use("/", productsRouter);
app.use("/", cartRouter);
