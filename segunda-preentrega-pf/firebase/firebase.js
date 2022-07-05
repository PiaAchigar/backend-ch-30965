//mi conexion a firebase a la collection "products"
//import admin from "firebase-admin";
const admin = require("firebase-admin");

// import { readFile } from "fs/promises";
// const serviceAccount = JSON.parse(
//   await readFile(new URL("./key.json", import.meta.url))
// );
const serviceAccount = require("./key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), //el metodo .cert recibe mi clave
  databaseURL: "https://hunko-farmacia.firebaseio.com", //url de nuestra db - project/hunko-farmacia
});

const db = admin.firestore();
//const query = db.collection("products"); //query para trabajar con una coleccion en específico
//export default query;
export default db; //lo exporto para usarlo
