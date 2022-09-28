//Lo llaman desde UserService.js
//Acá es donde cambio de persistencia sin que, alguien ajeno a la capa de "Persistencia" se entere de ése cambio
//El Repositorio es un intermediario entre el DAO y el Servicio, y nos sirve justamente para eso, para hacer el intercambio de DAO
//El DTO permite hacer el mapeo de todo lo que resivamos de los distintos DAOs
//Repositorio: Punto de entrada y salida de nuestra capa de Persistencia
const UserDAOMongo = require("../DAOs/user/UserDAOMongo");
const UserDTO = require("../DTOs/UserDTO");
//1 - invoco al DAO a partir de una factoria
const userDAOFactory = require("../Factories/userDAOFactory");

let instance = null; //me permite manejar el singleton

class UserRepository {
  constructor() {
    //this.dao = new UserDAOMongo()
    //this.dao = new UserDAOMysql()
    this.dao = userDAOFactory(process.env.STORAGE);
  }

  async getById(id) {
    const user = await this.dao.getById(id);
    //2 - Lo convertimos a DTOs, para que, sin importar el tipo de DAO la respuesta siempre sea la misma
    const usersDTO = new UserDTO(user);
    return usersDTO;
  }

  async getUserByEmail(email) {
    const user = await this.dao.getUserByEmail(email);

    if (user) {
      const userDTO = new UserDTO(user);
      return userDTO;
    }
    return null;
  }

  async createUser(data) {
    const newUser = await this.dao.createUser(data);
    const userDTO = new UserDTO(newUser);
    return userDTO;
  }

  static getInstance(model) {
    if (instance) {
      return instance;
    }
    instance = new UserRepository(model);
    return instance;
  }
}

module.exports = UserRepository;

/*
Clase 42 - Repaso - min 6
Cuando empecemos a armar metodos customs(ej: traer las noticias del último mes). Y en el DAO vos a seguir teniendo
metodos más genericos (por ej: findByQuery), ése DAO recibe algunos parámetros de busqueda, pero el Repositorio esoel que 
sabe que esas querys correspondes a las noticias del último mes
*/