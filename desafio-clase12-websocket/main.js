//Servidor
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { stripVTControlCharacters } = require("util");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use("/static", express.static(`${__dirname}/public`));
app.use(express.static("./public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("./public"));

let users = [];

//renderiza la vista "login"
app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  //guarda lo que viene del form login
  //se encargaría de validar a los usuarios
  const { username } = req.body;
  users.push(username);
  return res.redirect(`/logeado?username=${username}`); //redireccionamos y mando por queryparams el usuario con el q se registro a logeado.ejs
});

app.get("/logeado", (req, res) => {
    return res.redirect(`/logeado?username=${username}`); //mando por queryparams el usuario con el q se registro
  });