const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Container = require("./Container");
const contenedor = new Container();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  const data = {
    productos,
  };

  return res.render("listado", data);
});

app.post("/productos", async (req, res) => {
  const producto = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };

  const id = await contenedor.save(producto);
  console.log("ID asignado: ", id);
  return res.redirect("/");
});

const PORT = 8080;

// const server = app.listen(PORT, () =>
//   console.log(`Servidor corriendo en el puerto: ${PORT}`)
// );

// server.on("error", (error) => console.log(`Hubo un error: ${error}`));

//tengo que abrir un socket que cuando se envien por post los productos, el socket responda la actualizacion
//tengo q usar un middleware
httpServer.listen(PORT, () =>
  console.log(`Servidor corriendo en el puerto: ${PORT}`)
);

httpServer.on("error", (error) => console.log(`Hubo un error: ${error}`));

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado: ", socket.id);

  const productos = await contenedor.getAll();

  socket.emit("productos", productos);

  socket.on("recarga", (producto) => {
    // await contenedor.save(producto);
    // const productos = await contenedor.getAll();
    //necesito el ultimo con su id
    io.sockets.emit("ultimoProducto", producto);
  });
});
