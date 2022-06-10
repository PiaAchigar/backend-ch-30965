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
      console.error(
        "Error de lectura-liena 28- se lo manda vacio al array de Cart",
        e
      );
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
  async saveProduct(obj) {
    try {
      const arrayData = await this.getAllProducts();
      let now = Date.now();
      let id = 0;
      arrayData.length == 0
        ? (id = 1)
        : (id = arrayData[arrayData.length - 1].id + 1);
      obj.id ?? (obj.id = id);
      obj.timestamp = now;
      arrayData.push(obj);
      fs.promises.writeFile(this.archivoNameProduct, JSON.stringify(arrayData));

      return id;
    } catch (e) {
      console.error("Error de lectura", e);
    }
  }
  async updateProduct(
    id,
    { nombre, descripcion, codigo, foto, precio, stock }
  ) {
    try {
      const objViejo = getByIdProduct(id);
      let now = Date.now();
      objViejo.timestamp = now;
      nombre && (objViejo.nombre = nombre);
      descripcion && (objViejo.descripcion = descripcion);
      codigo && (objViejo.codigo = codigo);
      foto && (objViejo.foto = foto);
      precio && (objViejo.precio = precio);
      stock && (objViejo.stock = stock);
    } catch (e) {
      console.error("Error de lectura", e);
    }
  }
  async getByIdProduct(num) {
    try {
      const arrayData = await this.getAllProducts();
      const objObtenido = arrayData.find((e) => e.id == num) || "null";
      return objObtenido;
    } catch (e) {
      console.error("Dio error-fn getById", e);
    }
  }
  async deleteByIdProduct(num) {
    try {
      const arrayData = await this.getAllProducts();
      const index = arrayData.findIndex((e) => e.id == num);
      arrayData.splice(index, 1);
      fs.promises.writeFile(this.archivoNameProduct, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  //------------------------------ Cart------------------------
  async getByIdCart(num) { //me devuelve el obj carrito
    try {
      const arrayData = await this.getAllCarts();
      const cart = arrayData.find((c) => c.id == num);
      // const objObtenido = arrayData.map((cart) => {
      //   cart.find((e) => e.id == num) || "null";
      // });
      return cart;
    } catch (e) {
      console.error("Dio error-fn getByIdCart", e);
    }
  }

  async deleteAProductInCart(idCart, idProd) {
    try {
      const arrayData = await this.getAllProducts();
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
      const arrayData = await this.getAllCarts();
      const index = arrayData.findIndex((e) => e.id == num);
      arrayData.splice(index, 1);
      fs.promises.writeFile(this.archivoName, JSON.stringify(arrayData));
    } catch (e) {
      console.error("Dio error-fn deleteById", e);
    }
  }
  async deleteAllCart() {
    try {
      await fs.promises.writeFile(this.archivoNameCart, "[]");
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
