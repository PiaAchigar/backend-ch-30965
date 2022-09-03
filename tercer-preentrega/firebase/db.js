import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  //leo el archivo(./key.json) y lo guardo en ésta variable
  await readFile(new URL("./key.json", import.meta.url))
);
//console.log(serviceAccount);
admin.initializeApp({
  //inicializamos la conexión a mi bd
  credential: admin.credential.cert(serviceAccount), //el metodo .cert recibe mi clave
  databaseURL: "https://hunko-farmacia.firebaseio.com", //url de nuestra db - project/hunko-farmacia
});

const db = admin.firestore();
//const query = db.collection("products"); //query para trabajar con una coleccion en específico

//export default query;
module.export = db;
