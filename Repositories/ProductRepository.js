//Lo llaman desde ProductService.js
//codigo del profe
//const BaseRepository = require("./BaseRepository");
//class ProductRepository extends BaseRepository {
//findByPrice(price) {}

//const fs = require("fs");
//const ProductDAOMemory = require("../DAOs/product/ProductDAOMemory");
const ProductDTO = require("../DTOs/ProductDTO");
const productDAOFactory = require("../Factories/productDAOFactory");
//acá esta por default memory, no se si esta bien.

let instance = null;

class ProductRepository {
  constructor() {
    this.dao = productDAOFactory(process.env.STORAGE);
  }

  async saveProduct(product) {
    const prod = await this.dao.create(product);
    //console.log(this.dao);
    const productDTO = new ProductDTO(prod);
    return productDTO;
  }

  async getAll() {
    const prods = await this.dao.getAll();
    const productsDTO = prods.map((prod) => new ProductDTO(prod));
    return productsDTO;
  }

  async getOne(id) {
    const prod = await this.dao.getOne(id);
    return prod ? new ProductDTO(prod) : undefined;
  }

  async updateProduct(id, newProd) {
    const prod = await this.dao.update(id, newProd);
    const prodDTO = new ProductDTO(prod);
    return prodDTO;
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }

  static getInstance() {
    if (instance) {
      return instance;
    }
    instance = new ProductRepository();
    return instance;
  }
}

module.exports = ProductRepository;