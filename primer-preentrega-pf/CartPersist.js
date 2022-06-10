const fs = require("fs");

class CartPersist {
  constructor(archivoNameCart, archivoNameProduct) {
    this.archivoNameCart = archivoNameCart;
    this.archivoNameProduct = archivoNameProduct;
    this.arrayProductos = [];
  }
  async getAllProducts() {
    try {
      const data = await fs.promises.readFile(this.archivoNameProduct, "utf-8");
      const arrayData = JSON.parse(data);
      return arrayData;
    } catch (e) {
      const arrayData = [];
      console.error("Error de lectura-liena 28- se lo manda vacio al array", e);
      return arrayData;
    }
  }
  async getAllCarts() {
    try {
      const data = await fs.promises.readFile(this.archivoNameCart, "utf-8");
      const arrayData = JSON.parse(data);
      return arrayData;
    } catch (e) {
      const arrayData = [];
      console.error("Error de lectura-liena 28- se lo manda vacio al array", e);
      return arrayData;
    }
  }
  async newCart() {
    // creo un nuevo carrito
    try {
      const arrayData = await this.getAll();
      console.log("como viene el array?" + arrayData);
      let now = new Date().now;
      let idCart = 0;
      arrayData.length === 0
        ? (idCart = 1)
        : (idCart = arrayData[arrayData.length - 1].id + 1);
      let cart = {
        id: idCart,
        timestamp: now,
        productos: [], // acá voy pusheando los productos que agrega el cliente
      };
      arrayData.push(cart);
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
      return idCart;
    } catch (err) {
      console.error("Error de lectura", err);
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
  async getByIdCart(num) {
    try {
      const arrayData = await this.getAll();
      const objObtenido = arrayData.find((e) => e.id == num) || "null";
      return objObtenido;
    } catch (e) {
      console.error("Dio error-fn getByIdCart", e);
    }
  }

  async deleteAProductInCart(idCart, idProd) {
    try {
      const arrayData = await this.getAll();
      const indexCart = arrayData.findIndex((e) => e.id == idCart);
      const indexProd = arrayData[indexCart].findIndex((e) => e.id == idProd);
      arrayData[indexCart].splice(indexProd, 1);
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteByIdCart(num) {
    try {
      const arrayData = await this.getAll();
      const index = arrayData.findIndex((e) => e.id == num);
      arrayData.splice(index, 1);
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteAllCart() {
    try {
      await fs.promises.writeFile(this.archivoName, "[]");
      // const arrayData = [];
      // fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.log("Error al limpiar el archivo", e);
    }
  }
}

module.exports = CartPersist;

//cada id es un cart distinto
//[{id:1,products:[{},{},{}]},{id:2,products:[{},{},{}]},{id:2,products:[{},{},{}]}]
