const { application } = require("express");
const express = require("express");
const { Router } = express();
const productsRouter = Router();

//const { options } = require("./db/mysql"); // recupero los parámetros de config de nuestra BD
const { options } = require("./db/sqlite3");

const knex = require("knex")(options);

const app = express();

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});
