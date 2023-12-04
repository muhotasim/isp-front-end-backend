const { db, verifyHash, generateToken } = require("../utils");
const { BaseModel } = require("./base")
function User() {

}
User.prototype.tableName = "users";

User.prototype.get = async function ({ user_name, email, phone, user_type, status, perPage, page, getCount }) {

    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null
    if (getCount == 1) {
        count = (await this.db(this.tableName).count('id as c')
            .where(function () {
                if (user_name) {
                    this.where('user_name', 'like', '%' + user_name + '%')
                }
            })
            .orWhere(function () {
                if (email) {
                    this.where('email', 'like', '%' + email + '%')
                }
            })
            .orWhere(function () {
                if (phone) {
                    this.where('phone', 'like', '%' + phone + '%')
                }
            })
            .orWhere(function () {
                if (user_type) {
                    this.where('user_type', 'like', '%' + user_type + '%')
                }
            }).first())['c'];
    }



    const data = await this.db(this.tableName)
        .where(function () {
            if (user_name) {
                this.where('user_name', 'like', '%' + user_name + '%')
            }
        })
        .orWhere(function () {
            if (email) {
                this.where('email', 'like', '%' + email + '%')
            }
        })
        .orWhere(function () {
            if (phone) {
                this.where('phone', 'like', '%' + phone + '%')
            }
        })
        .orWhere(function () {
            if (user_type) {
                this.where('user_type', 'like', '%' + user_type + '%')
            }
        })
        .orderBy('id','DESC')
        .limit(perPage, { skipBinding: true })
        .offset(offset);
    const response = { data }

    if (getCount == 1) response.count = count;
    return {
        count, data
    }
}

User.prototype.login = async function ({ username, password }) {
    const data = await this.db(this.tableName)
        .where('email', username).orWhere('user_name', username).first();
    if (data && verifyHash(data.password, password)) {
        data.token = generateToken(data.id)
        return data;
    } else {
        return false;
    }
}
User.prototype.getBy = async function ({ fieldname, value }) {
    const data = await this.db(this.tableName)
        .where(fieldname, value);
    return data
}
User.prototype.getById = async function (id) {
    return await this.db(this.tableName).where('id', id).first()
}

User.prototype.create = async function ({ user_name, email, phone, user_type, status, details, password, created_by }) {
    const id = await this.db(this.tableName).insert({
        user_name, email, phone, user_type, status, details, password, created_by: created_by
    })
    return this.getById(id)
}

User.prototype.update = async function (id, { user_name, email, phone, user_type, status, details, password, created_by }) {
    return await this.db(this.tableName).where('id', id).update({
        user_name, email, phone, user_type, status, details, password, last_updated_by: created_by
    })
}

User.prototype.delete = async function (id) {
    return await this.db(this.tableName).where('id', id).del();
}

User.prototype.getDashboard = async function () {
    
    return await this.db.transaction(async function(trx){
        const totalUsers =( await trx.count('id as c').from('users').first())['c']
        const totalContent = ( await trx.count('id as c').from('contents').first())['c']
        const totalPages = ( await trx.count('id as c').from('pages').first())['c']
        // const totalTags = ( await trx.count('id as c').from('tags').first())['c']
        // const totalCategories = ( await trx.count('id as c').from('categories').first())['c']

        return { totalUsers, totalContent, totalPages };
    });
}
Object.setPrototypeOf(User.prototype, BaseModel.prototype)

module.exports = { User }