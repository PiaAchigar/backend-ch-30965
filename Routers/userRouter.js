//Acá llamamos al Servicio y el Repositorio y los inyectamos
const { Router} = require('express')
const UserController = require('../Controllers/UserController')
const UserService = require('../Services/UserService')
const UserRepository = require('../Repositories/UserRepository')
//Modelo de la BD, otra capa
const userModel = require('../Models/userModel')
const productModel = require('../Models/productModel')

//Hago la instancia del repositorio pasándole el modelo de mongoose
const userRepository = new UserRepository(userModel)
//creo la instancia del servicio y le paso lo que requiere-> que es un repositorio
const userService = new UserService(userRepository)
//instancia del controlador y le paso lo que requiere, el servicio
const userController = new UserController(userService)

const userRouter = new Router()

//userRouter.get('/', (req, res) => userController.get(req, res) ) la invocamos para que tome el this y no llegue "undefind" al otro lado
userRouter.get('/', userController.get.bind(userController))
userRouter.post('/', userController.post.bind(userController))

module.exports = userRouter
//y lo llamamos desde nuestro service.js -> o sea "El servidor"