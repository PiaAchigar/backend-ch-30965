const fs = require("fs");

class Contenedor {
  constructor(archivoName) {
    this.archivoName = archivoName;
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile("productos.txt", "utf-8");
      const arrayData = JSON.parse(data);
      return arrayData;
    } catch (e) {
      const arrayData = [];
      console.error("Error de lectura-liena 28", e);
      return arrayData;
    }
  }

  async save(obj) {
    try {
      const arrayData = await this.getAll();
      arrayData.length == 0
        ? (obj.id = 1)
        : (obj.id = arrayData[arrayData.length - 1].id + 1);
      arrayData.push(obj);
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));

      return obj.id;
    } catch (e) {
      console.error("Error de lectura", e);
    }
  }
  async getById(num) {
    try {
      const arrayData = await this.getAll();
      const objObtenido = arrayData.find((e) => e.id == num) || "null";
      return objObtenido;
    } catch (e) {
      console.error("Dio error-fn getById", e);
    }
  }
  async deleteById(num) {
    try {
      const arrayData = await this.getAll();
      const index = arrayData.findIndex((e) => e.id == num);
      arrayData.splice(index, 1);
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteAll() {
    try {
      const arrayData = [];
      fs.promises.writeFile("productos.txt", JSON.stringify(arrayData));
    } catch (e) {
      console.log("Error al limpiar el archivo", e);
    }
  }
}

module.exports = Contenedor;
// let archivo = new Contenedor();
// const objSemi = {
//   title: "Semicirculo",
//   price: 100,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
// };
// const objCircle = {
//   title: "Calculadora",
//   price: 234.56,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//   id: 2,
// };
// const objGlobo = {
//   title: "Globo Terráqueo",
//   price: 345.67,
//   thumbnail:
//     "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
//   id: 3,
// };

// console.log("--------------Save--------------");
// (async () => {
//   try {
//     console.log(await archivo.save(objSemi));
//     //console.log(archivo.save(objCircle));
//     //console.log(archivo.save(objGlobo));
//   } catch (e) {
//     console.log("Error de IIFE-save", e);
//   }
// })();

// console.log("-------------GetById-------------");
// (async () => {
//   //como llamo a una funcion asinc , tengo que usar una IIFE
//   try {
//     let obj = await archivo.getById(2);
//     console.log({ obj });
//     //console.log(await archivo.getById(2));
//   } catch (e) {
//     console.log("Error de IIFE", e);
//   }
// })();
// console.log("-------------deleteById-------------");
// (async () => {
//   try {
//     await archivo.deleteById(2);
//   } catch (e) {
//     console.log("Error de IIFE-delete", e);
//   }
// })();

//console.log("-------------deleteAll-------------");
// (async () => {
//   try {
//     await archivo.deleteAll();
//   } catch (e) {
//     console.log("Error de IIFE-delete", e);
//   }
// })();
