//Va a devolver la instancia que necesitemos
//Archivo
const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo");
const CarritoDaoArchivo = require("./carritos/CarritoDaoArchivo");
//MySql
const ProductosDaoMysql = require("./productos/ProductosDaoMysql");
const CarritoDaoMysql = require("./carritos/CarritoDaoMysql");
//mongodb
const ProductosDaoMongoDB = require("./productos/ProductosDaoMongoDB");
const CarritoDaoMongoDB = require("./carritos/CarritoDaoMongoDB");
//Firebase
const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase");
const CarritoDaoFirebase = require("./carritos/CarritoDaoFirebase");

const getStorage = () => {
  const storage = process.env.storage || "mongodb";
  switch (storage) {
    case "archivo":
      return {
        products: new ProductosDaoArchivo(),
        carrito: new CarritoDaoArchivo(),
      };
      break;
    case "mysql":
      return {
        products: new ProductosDaoMysql(),
        carrito: new CarritoDaoMysql(),
      };
      break;
    case "mongodb":
      return {
        products: new ProductosDaoMongoDB(),
        carrito: new CarritoDaoMongoDB(),
      };
      break;
    case "firebase":
      return {
        products: new ProductosDaoFirebase(),
        carrito: new CarritoDaoFirebase(),
      };
      break;
    default:
      return {
        products: new ProductosDaoArchivo(),
        carrito: new CarritoDaoMysql(),
      };
      break;
  }
};

module.exports = getStorage;
