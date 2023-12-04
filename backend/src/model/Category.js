const { db } = require("../utils");
const { BaseModel } = require("./base")
function Category() {

}
Category.prototype.tableName = "categories";

Category.prototype.get = async function ({ title,  perPage, page, getCount }) {

    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;
    if (getCount == 1) {
        count = (await this.db(this.tableName).count('id as c')
            .where(function(){
                if(title){
                    this.where('title', 'like', '%' + title + '%')
                }
            }).first())['c']
    }


    const data = await this.db(this.tableName)
        .where(function(){
            if(title){
                this.where('title', 'like', '%' + title + '%')
            }
        })
        .orderBy('id','DESC')
        .limit(perPage, { skipBinding: true })
        .offset(offset)
    const response = {
        data
    }
    if (getCount == 1) response.count = count;
    return response;
}

Category.prototype.getById = async function (id) {
    return await this.db(this.tableName).where('id', id).first()
}

Category.prototype.create = async function ({
    title,  content_body, created_by, meta_title,
    meta_key, meta_description, no_follow = 0, no_index = 0, status = 1
}) {

    const id = await this.db(this.tableName).insert({
        title,  content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    })
    await this.buildAndSavePermalink(title,'categories', id);
    return this.getById(id)
}

Category.prototype.update = async function (id, { title,  content_body, created_by, meta_title,
    meta_key, meta_description, no_follow = 0, no_index = 0, status = 1 }) {
    return await this.db(this.tableName).where('id', id).update({
        title,  content_body, last_updated_by: created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    })
}

Category.prototype.delete = async function (id) {
    let tb = this.tableName
    return await this.db.transaction(async function(trx){
        await trx.from('permalinks').where('type','=', 'category').where('id', '=',id).del()
        return await trx.from(tb).where('id', '=',id).del()
    })
}

Object.setPrototypeOf(Category.prototype, BaseModel.prototype)

module.exports = { Category }