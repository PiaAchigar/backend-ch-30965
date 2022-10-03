const ProductService = require("../../Services/ProductService");

class ProductResolver {
  constructor() {
    this.service = new ProductService();
  }
//Acá estan todos los resolvers, que se tienen que llamar igual a las querys que definimos 
// dentro de nuestro Schema
  getProduct = async ({ id }) => {
    const datos = await this.service.getOne(id);
    if(!datos) throw new Error("Product not found");
    return datos;
    //throw funciona igual que un return
  };

  getProducts = async ({ campo, valor }) => {
    const datos = await this.service.getAll();
    if (campo && valor) return datos.filter((prod) => prod[campo] == valor);
    return datos;
  };

  createProduct = async ({ values }) => {
    const data = await this.service.createProduct(values);
    //const id = crypto.randomByTes(10).toString('hex') //genera un string aleatorio
    return data;
  };

  updateProduct = async ({ id, values }) => {
    const data = await this.service.updateProduct(id, values);
    return data;
  };

  deleteProduct = async ({ id }) => {
    return await this.service.deleteProduct(id);
  };
}

module.exports = ProductResolver;
