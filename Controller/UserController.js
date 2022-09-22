//Capa 1 - 3er parte. El nombre del archivo está en mayusculas por que es una clase lo que tiene adentro
//Le mando un UserService cualquiera, el que yo quiera
//Es como el ultimo middleware de una ruta (de express), que es el enrutamiento
//Es el que al final va a responder una petición
class UserController {
  constructor(service) {
    this.service = service;
  }

  async get(req, res) {
    //console.log({ this })
    try {
      const items = await this.service.getAll();
      return res.json(items);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.message,
      });
    }
  }

  async post(req, res) {
    const data = req.body;
    try {
      const itemCreated = await this.service.create(data);
      return res.status(201).json(itemCreated);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}

module.exports = UserController;
