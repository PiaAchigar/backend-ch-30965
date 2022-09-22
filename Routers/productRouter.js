const { Router } = require("express");

const ProductController = require("../Controller/ProductController");
const ProductService = require("../Services/ProductService");
const ProductRepository = require("../Repositories/ProductRepository");

const productService = new ProductService();
const productController = new ProductController(productService);

const productRouter = new Router();

productRouter.get("/:id?", productController.get.bind(productController));

productRouter.get(
  "/productos-test",
  productController.createRandom.bind(productController)
);

productRouter.post(
  "/",
  productController.createProduct.bind(productController)
);

productRouter.put(
  "/:id",
  productController.updateProduct.bind(productController)
);

productRouter.delete(
  "/:id",
  productController.deleteProduct.bind(productController)
);

module.exports = productRouter;
