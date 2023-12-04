const { db } = require("../utils");
const { BaseModel } = require("./base")
function Menu() {

}
Menu.prototype.tableName = "menus";

Menu.prototype.get = async function () {

    const data = await this.db(this.tableName);
    const response = {
        data
    }
    return response;
}

Menu.prototype.getById = async function (id) {
    return await this.db(this.tableName).where('id', id).first()
}

Menu.prototype.create = async function ({ name, link, parent, type, status }) {
    const id = await this.db(this.tableName).insert({
        name, link, parent, type, status
    })
    return this.getById(id)
}

Menu.prototype.update = async function (id, { name, link, parent, type, status }) {
    return await this.db(this.tableName).where('id', id).update({
        name, link, parent, type, status
    })
}

Menu.prototype.delete = async function (id) {
    return await this.db(this.tableName).where('id', id).del();
}

Object.setPrototypeOf(Menu.prototype, BaseModel.prototype)

module.exports = { Menu }