const ProductRepository = require("../Repositories/ProductRepository");
const logger = require("../utilities/logger");

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }
  async getAll() {
    const data = await this.repository.getAll();
    return data;
  }
  async createProduct(value) {
    return await this.repository.saveProduct(value);
  }
  async getOne(id) {
    const prod = await this.repository.getOne(id);
    return prod;
  }

  async updateProduct(id, newProd) {
    return await this.repository.updateProduct(id, newProd);
  }

  async deleteProduct(id) {
    return await this.repository.deleteProduct(id);
  }
}

module.exports = ProductService;