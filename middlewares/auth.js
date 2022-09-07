const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/auth/login");
};

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  return res.redirect("/index");
};

const admin = true;

//corroboro que sea administrador - sino es administrador le digo que no esta autorizado a acceder a dicha ruta
const isAdmin = (req, res, next) => {
  if (admin) next();
  else
    return res.json({
      error: -1,
      descripcion: `Ruta ${req.url} método ${req.method} no autorizada`,
    });
};

module.exports = isAdmin;

module.exports = { isAuthenticated, isNotAuthenticated, isAdmin };
