const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const crypto = require("crypto");

// 1-lo primero que necesita mi servidor GraphQL es un Schema-> definimos nuestros TD y querys disponibles
// Schema = que es lo que vamos a exponer desde nuestro servidor GraphQL
const Schema = buildSchema(`
type Product {
    id: ID!,
    title: String,
    price: Int,
    thumbnail: String
}
input ProductInput {
    title: String,
    price: Int,
    thumbnail: String
}
type Query {
    getProduct(id: ID!): Product
    getProducts(campo: String, valor: String): [Product]
}
type Mutation {
    createProduct(values: ProductInput): Product,
    updateProduct(id: ID!, values: ProductInput): Product,
    deleteProduct(id: ID!): Boolean
}
`);

//los "input" acá son como los "request bodys" de swagger
//El "type Query" es muy parecido a TS, fn(lo que recibe) : lo que devuelve/respuesta
//Diapo 7 : El desarrollador de API adjunta cada campo de un esquema a una función llamada resolución. Durante la ejecución, se llama a la resolución para que genere el valor.
//  ID! -> obligatorio
//"type Mutation"-> operaciones de escritura(de modificacion / creacion)

// 2 - Defino la clase Producto que me permite mapear éste TD
// esta en el archivo: resolvers -> productResolver.js
const ProductResolver = require("./resolvers/productResolver");
const productResolver = new ProductResolver();

module.exports = () => {
  return graphqlHTTP({
    Schema,
    rootValue: {
      getProduct: productResolver.getProduct,
      getProducts: productResolver.getProducts,
      createProduct: productResolver.createProduct,
      updateProduct: productResolver.updateProduct,
      deleteProduct: productResolver.deleteProduct,
    },
    graphiql: true,
  });
};
// rootValue son los resolvers -> query o mutacion a mapear : el resolver
//graphiql: true ->