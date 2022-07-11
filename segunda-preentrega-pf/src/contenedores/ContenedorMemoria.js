class ContenedorMemoria {
  constructor() {
    this.memory = [];
  }
  findAll = () => {
    return this.memory;
  };
  find = (id) => {
    return this.memory.find((mem) => mem.id === Number(id));
  };

  create = (item) => {
    const itemArr = [...this.memory];
    const lastId = itemArr.length > 0 ? itemArr[itemArr.length - 1].id : 0;
    item.id = lastId + 1;
    item.created_at = Date.now();
    itemArr.push(item);
    this.memory = [...itemArr];
    return item.id;
  };
  update = (id, newItem) => {
    const newArr = this.memory.map((item) => {
      if (Number(id) !== item.id) return item;
      else {
        return Object.assign(item, newItem);
      }
    });
    this.memory = [...newArr];
    return;
  };
  delete = (id) => {
    const newArr = this.memory.filter((item) => item.id !== Number(id));
    this.memory = [...newArr];
    return;
  };
}
module.exports = ContenedorMemoria;
