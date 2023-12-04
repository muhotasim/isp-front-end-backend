const { db } = require("../utils");
const { BaseModel } = require("./base")
function Settings() {

}
Settings.prototype.tableName = "settings";

Settings.prototype.get = async function () {
    const data = await this.db(this.tableName);
    return {
       data
    }
}

Settings.prototype.getById = async function (key) {
    return await this.db(this.tableName).where('name', key).first()
}

Settings.prototype.getGlobalSettings =async function (){
    let settingsRes = await this.db.select('*').from(this.tableName)
    let settings = {}
    settingsRes.forEach(setting=>{
            settings[setting.name] = setting.value
        })
    return settings;
}
Settings.prototype.update = async function (id, { name, value }) {
    let updatedRes = await this.db(this.tableName).where('name', id).update({
        name, value
    })

    return updatedRes
}


Object.setPrototypeOf(Settings.prototype, BaseModel.prototype)

module.exports = { Settings }