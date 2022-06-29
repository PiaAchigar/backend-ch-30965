//contenedor genérico
class ContenedorFirebase {
  constructor(name) {
    //name se refiere al nombre del archivo
    this.name = name;
  }
  findAll() {
    //la promesa devuelve un JSON String
    return fs.promises
      .readFile(this.name, "utf-8")
      .then((itemString) => JSON.parse(itemString)); //ahora si nos devuelve un arreglo
  }
  find(id) {}

  create(data) {
    //recibo un obj - lo tengo q pasar a String antes de guardarlo
    return this.findAll().then((items) => {
      items.push(data);
      const dataString = JSON.stringify(items, null, 2); // null y 2, hace que respete el formato del JSON
      return fs.promises.writeFile(this.name, dataString);
    });
  }
  update(id, data) {}
  delete(id) {}
}
module.exports = ContenedorFirebase;
