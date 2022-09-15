//capa de Persistencia - Repositorio - BD - y lo manejamos con mongoose / Firebase / Knex
class BaseRepository {
    constructor (model) {
      this.model = model
    }
  
    async getAll () {
      return await this.model.find()
      //ya hablamos de un schema de mongoose
    }
  
    async create (data) {
      return await this.model.create(data)
    }
  }
  
  module.exports = BaseRepository