const options = {
  client: "sqlite3",
  connection: { filename: "./mydb.sqlite" }, //no es en formato json, es info binaria no lo puedo abrir con el vsc
};
module.exports = {
  options,
};
