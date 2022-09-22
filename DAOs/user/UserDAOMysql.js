const db = require('../db/mysql')()

class UserDAOMysql {
  constructor () {
    this.db = db
    this.table = 'users'
  }

  async getAll () {
    //acá aplica ORM(Tipo knex, sequelize), lo hace un poco mas lento(nano seg), pero mas seguro
    return this.db.from(this.table).select('*')
  }
}

module.exports = UserDAOMysql