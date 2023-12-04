const { db } = require("../utils");
const { BaseModel } = require("./base")
function Files() {

}
Files.prototype.tableName = "files";

Files.prototype.get = async function ({ type, name, perPage, page, getCount }) {

    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;

    if (getCount == 1) {
        count = (await this.db(this.tableName).count('id as c')
            .where(function () {
                if (type) {
                    this.where('type', 'like', '%' + type + '%')
                }
            }).orWhere(function () {
                if (name) {
                    this.where('original_name', 'like', '%' + name + '%')
                }
            })
            .first())['c']
    }


    const data = await this.db(this.tableName)
        .where(function () {
            if (type) {
                this.where('type', 'like', '%' + type + '%')
            }
        }).orWhere(function () {
            if (name) {
                this.where('original_name', 'like', '%' + name + '%')
            }
        })
        .orderBy('id','DESC')
        .limit(perPage, { skipBinding: true })
        .offset(offset)

    const response = { data }
    if (getCount == 1) response.count = count;
    return response
}

Files.prototype.getById = async function (id) {
    return await this.db(this.tableName).where('id', id).first()
}

Files.prototype.create = async function ({ type, location, uri, created_by, ext, original_name }) {
    const id = await this.db(this.tableName).insert({
        type, location, uri, created_by, ext, original_name
    })
    return this.getById(id)
}

Files.prototype.delete = async function (id) {
    return await this.db(this.tableName).where('id', id).del();
}

Object.setPrototypeOf(Files.prototype, BaseModel.prototype)

module.exports = { Files }