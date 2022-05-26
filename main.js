const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const Container = require("./Container");
//app.use("/static", express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedor = new Container();
const engineFn = engine({
  // registro el engine de hbs
  extname: ".hbs",
  defaultLayout: `${__dirname}/views/hbs/index.hbs`,
  layoutsDir: `${__dirname}/views/hbs/layouts`,
  partialsDir: `${__dirname}/views/hbs/partials`,
});

app.engine("hbs", engineFn);

app.set("views", "./views/hbs");
app.set("view engine", "hbs");

app.get("", (req, res) => {
  return res.render("layouts/main");
});

app.get("/listado", async (req, res) => {
  const productos = await contenedor.getAll();
  const data = {
    productos,
  };

  return res.render("layouts/listado", data);
});

//con hbs
app.post("/listado", async (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    foto: req.body.foto,
  };
  const id = await contenedor.save(producto);
  console.log("ID asignado: ", id);
  return res.redirect("/"); //como no va a mostrar nada, lo redirijo al form
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));
