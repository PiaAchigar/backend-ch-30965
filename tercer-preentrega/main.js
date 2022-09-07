const express = require("express");
const app = express();
const productsRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter");
const authRouter = require("./routers/authRouter");
const appRouter = require("./routers/appRouter");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const multer = require("multer");
const {
  isAuthenticated,
  isNotAuthenticated,
  isAdmin,
} = require("./middlewares/auth");
const { engine } = require("express-handlebars");
const initializePassport = require("./config/passport");
const connectDB = require("./db/db");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGODB_URI);

if (process.env.STORAGE === "mongodb") Database.connect();
app.use(express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "1234",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

//app.use(multer());

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.use("/auth", authRouter);
app.use("/", appRouter);

const server = app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));
