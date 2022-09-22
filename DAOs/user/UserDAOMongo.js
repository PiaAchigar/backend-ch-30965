//Capa de mas bajo nivel que se comunica directamente con la BD a traves de algun mongoose x ejemplo
const userModel = require("../../Models/userModel");
const { createHash } = require("../../utilities/isValidPassword");

class UserDAOMongo {
  constructor() {
    this.userModel = userModel;
  }

  async getAll() {
    return await this.model.find();
  }
  async getById(_id) {
    return await this.userModel.findOne({ _id });
  }

  async getUserByEmail(email) {
    return await this.userModel.findOne({ email });
  }

  async createUser(data) {
    const newUser = new this.userModel({
      email: data.email,
      password: createHash(data.password),
    });

    return await newUser.save();
  }
}

module.exports = UserDAOMongo;
