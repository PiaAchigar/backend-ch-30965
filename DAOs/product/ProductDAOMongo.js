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
  async getOne(id) {
    const product = await this.model.find({ _id: id });
    return product;
  }

  async create(product) {
    const newProduct = new this.model(product);
    console.log(newProduct);
    return await newProduct.save();
  }

  async update(id, product) {
    const newProduct = await this.model.findOneAndUpdate(
      { _id: id },
      { ...product },
      { new: true }
    );
    return newProduct;
  }

  async delete(id) {
    const deleted = await this.model.deleteOne({ _id: id });
    return deleted;
  }
}

module.exports = ProductDAOMongo;
