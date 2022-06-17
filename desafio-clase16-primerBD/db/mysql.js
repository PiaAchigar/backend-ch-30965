//conexión
const options = {
  client: "mysql",
  connection: {
    host: "127.0.0.1", // para MAC es una IP distinta
    user: "root",
    password: "",
    database: "clase16",
  },
  pool: { min: 0, max: 8 },
};
module.exports = {
  options,
};
