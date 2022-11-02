//Lo llaman desde userRouter.js
//Ésta es la capa que mas va a crecer cuando empecemos a robustecer nuestro servidor

//const BaseService = require('./BaseService')

//Le mando el UserRepository que yo quiera, y todas las inyecciones las hago desde el router

// class UserService extends BaseService {
// }

// module.exports = UserService

const UserRepository = require("../Repositories/UserRepository");

class UserService {
    constructor() {
        this.userRepository = UserRepository.getInstance();
    }

    async getById(id) {
        const user = this.userRepository.getById(id);
        return user;
    }

    async getUserByEmail(email) {
        const datos = await this.userRepository.getUserByEmail(email);
        return datos;
    }
    async createUser(data) {
        const newUser = await this.userRepository.createUser(data);
        return newUser;
    }
}

module.exports = UserService;

/*
Clase 42 - Repaso - min 7
Servicio : Capa de Dominio o de Lógica de negocio. Acá va a estar toda la lógica de mi negocio
sin importar la persistencia.
- Acá se hacen las validaciones de Negocio. Desde acá llamo a la capa de Validacion si quiero.
Corta que siga la ejecucion si es que no se validan las cosas
*/