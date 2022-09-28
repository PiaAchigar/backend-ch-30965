//Capa de mas bajo nivel que se comunica directamente con la BD a traves de algun modelo, ejemplo mongoose para Mongo
const fs = require("fs");

class BaseDAOMemory {
    constructor(path) {
        this.filePath = path;
    }
    async saveFile(newArray) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(newArray, null, 2));
        } catch (err) {
            console.log(err);
        }
    }

    async readFile() {
        try {
            const fileSaved = await fs.promises.readFile(this.filePath, "utf-8");
            return (!fileSaved) ? [] : JSON.parse(fileSaved)
            //if (!fileSaved) return [];
            //else return JSON.parse(fileSaved);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = BaseDAOMemory;