const fs = require("fs");
const print = require("../utils/print");
class Storage {
  constructor() {
    this.messagesFile = `${__dirname}/messages.json`;
  }

  async saveMessage(message) {
    let file = await this.getAll(this.messagesFile);
    print(file.messages);
    file.messages.push(message);
    await this.saveFile(file, this.messagesFile);
    return message.id;
  }

  async getAll() {
    let messages;
    try {
      const file = await fs.promises.readFile(this.messagesFile, "utf-8");
      if (!file) messages = { id: 1 };
      else messages = JSON.parse(file);
    } catch (err) {
      console.log(err);
    }
    return messages;
  }

  async saveFile(newArr, filePath) {
    await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
  }
}

module.exports = Storage;
