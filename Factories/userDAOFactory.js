const UserDAOMongo = require('../DAOs/user/UserDAOMongo')
const UserDAOMysql = require('../DAOs/UserDAOMysql')

//la instancia no se va a generar hasta que yo ejecute la fn
const storageMapper = {
  //mysql: () => UserDAOMysql.getInstance(),
  mysql: () => new UserDAOMysql(),
  mongo: () => new UserDAOMongo()
}

module.exports = (storage) => {
  const storageDAOFn = storageMapper[storage] || storageMapper.mongo //storageMapper.mysql o stora ge[mysql]
  const dao = storageDAOFn() //ejecuto la fn correspondiente, y eso si ya es un DAO
  console.log(dao)
  return dao
}
//me voy a repositorio de User