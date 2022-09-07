const { verifyPassword, createHash } = require("../utils/isValidPassword");
const Users = require("../models/User");
const { Strategy: LocalStrategy } = require("passport-local");
//configuración del mail
const sendMail = require("../utils/sendMail");

initialize = (passport) => {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },

      async (email, password, done) => {
        try {
          const user = await Users.findOne({ email: email });
          if (!user)
            return done(null, false, {
              message: "Usuario no encontrado",
            });

          if (!verifyPassword(password, user))
            return done(null, false, {
              message: "Password incorrecto",
            });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //me falta lo de la foto, y guardarlo en una carpeta publica con acceso por url
  passport.use(
    "register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await Users.findOne({ email: email });
          if (user)
            return done(null, false, {
              message: "El nombre de usuario ya esta en uso.",
            });

          const newUser = {
            email: req.body.email,
            password: createHash(password),
            age: req.body.age,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            photo_url: req.file.filename,
          };

          const response = await Users.create(newUser);
          await sendMail(
            process.env.ADMIN_EMAIL,
            "Nuevo Registro",
            JSON.stringify(newUser, null, 2)
          );
          return done(null, response);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });
};

module.exports = initialize;
