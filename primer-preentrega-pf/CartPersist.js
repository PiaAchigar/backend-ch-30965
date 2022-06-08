const fs = require("fs");

class CartPersist {
  constructor(archivoName) {
    this.archivoName = archivoName;
  }
  async getAll() {
    try {
      const data = await fs.promises.readFile(this.archivoName, "utf-8");
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
      let now = new Date().now;
      let idCart = 0;
      arrayData.length == 0
        ? (idCart = 1)
        : (idCart = arrayData[arrayData.length - 1].id + 1);

      let cart = {
        id: idCart,
        timestamp: now,
        products: products.push(obj),
      };

      arrayData.push(cart);
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));

      return idCart;
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
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteAll() {
    try {
      const arrayData = [];
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.log("Error al limpiar el archivo", e);
    }
  }
}

module.exports = CartPersist;

//cada id es un cart distinto
//[{id:1,products:[{},{},{}]},{id:2,products:[{},{},{}]},{id:2,products:[{},{},{}]}]
