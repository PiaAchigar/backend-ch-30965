//primero instalamos koa-body y koa-router
const Koa = require("koa");
const koaBody = require("koa-body");

const booksRouter = require("./books");

const app = new Koa();

//lo inyecto, permite recibir info por aplication JSON, etc...
app.use(koaBody());

app.use(booksRouter.routes());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
  console.log(`Serivdor Koa corriendo en el puerto ${PORT}`)
);
