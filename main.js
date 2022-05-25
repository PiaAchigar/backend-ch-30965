const express = require("express");
const { engine } = require("express-handlebars");
const app = express();

app.use("/static", express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const engineFn = engine({
  // registro el engine de hbs
  extname: ".hbs",
  defaultLayout: `${__dirname}/views/index.hbs`,
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
});

app.engine("hbs", engineFn);

app.set("views", "./views");
app.set("view engine", "hbs");

const productos = [];
//con hbs
app.post("/producto", (req, res) => {
  const producto = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    foto: req.body.foto,
  };
  productos.push(producto);
  return res.redirect("/"); //como no va a mostrar nada, lo redirijo al form
});

app.get("", (req, res) => {
  return res.render("layouts/main");
});

app.get("/listado", (req, res) => {
  const data = {
    nombre: "escuadra",
    precio: 1245,
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png",
  };
  return res.render("layouts/listado", data);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => console.log(`Error en servidor: ${error}`));
