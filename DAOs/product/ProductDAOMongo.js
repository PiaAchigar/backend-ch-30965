const { ProductModel } = require("../../Models/productModel");
//const productModel = require("../../Models/productModel");

class ProductDAOMongo {
  constructor() {
    this.model = ProductModel;
  }
  async saveProduct(product) {
    const newProduct = new this.model(product);
    console.log(newProduct);
    return await newProduct.save();
  }

  async getAll() {
    const allProducts = await this.model.find();
    return allProducts;
  }
}

module.exports = ProductDAOMongo;
