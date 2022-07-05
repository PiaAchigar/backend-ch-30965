//contenedor genérico
const parseDoc = require("../../firebase/parseDoc");
class ContenedorFirebase {
  constructor(query) {
    this.query = query;
  }

  findAll = async () => {
    let doc;
    try {
      const response = await this.query.get();
      const docs = response.docs;
      doc = docs.map(parseDoc);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    return doc;
  };

  find = async (id) => {
    let item;
    try {
      const response = await this.query.doc(id).get();
      item = parseDoc(response);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    return item;
  };

  create = async (item) => {
    try {
      const user = await this.query.add(item);
      console.log(user);
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
  update = async (id, newItem) => {
    try {
      await this.query.doc(id).update(newItem);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  delete = async (id) => {
    try {
      await this.query.doc(id).delete();
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  };
}
module.exports = ContenedorFirebase;
