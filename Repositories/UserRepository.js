//Lo llaman desde UserService.js
const UserDAOMongo = require("../DAOs/user/UserDAOMongo");
const UserDTO = require("../DTOs/UserDTO");
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
