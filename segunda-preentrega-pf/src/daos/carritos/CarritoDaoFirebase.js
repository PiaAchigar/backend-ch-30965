//Los DAOS: son una abstraccion mas de la q hacemos en los Routers con las Class

const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");
const db = require("../../../firebase/firebase");

const query = db.collection("carts");

class CarritoDaoFirebase extends ContenedorFirebase {
  constructor() {
    super(query);
  }

  deleteCartProduct = async (id, prodId) => {
    try {
      const cart = await this.getItemById(id);
      const newProdsCart = cart.products.filter((prod) => prod.id !== prodId);
      await this.update(cart.id, { products: newProdsCart });
    } catch (err) {
      console.log(err);
    }
  };

  getCartProducts = async (id) => {
    let cart;
    try {
      cart = await this.find(id);
    } catch (err) {
      console.log(err);
    }
    return cart.products;
  };

  addCartProduct = async (id, prod) => {
    try {
      let cart = await this.find(id);
      console.log(cart);
      cart.products ??= [];
      cart.products.push(prod);
      await this.update(cart.id, cart);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = CarritoDaoFirebase;
