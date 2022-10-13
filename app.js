const Koa = require("koa");
const app = new Koa();

//defino la ruta, el middleware, no se necesita el req y el res, se usa un unico objeto, que se llama
// contexto -> ctx  y acá a dentro esta todo, req, resp, parametros, etc
app.use(async (ctx) => {
    //modifico la propiedad body del contexto
  ctx.body = "Hola Mundo con koa";
});

const PORT = process.env.PORT || 8080;

//levanto mi app en el puerto
app.listen(PORT);

//para hacer un aapi rest con koa hay que instalar los paquetes por separado - koa-body(en express es el body parser) 
//koa-router (en express son los routers)