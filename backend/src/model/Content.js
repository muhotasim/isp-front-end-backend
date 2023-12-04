const { db } = require("../utils");
const { BaseModel } = require("./base")
function Content() {

}
Content.prototype.tableName = "contents";

Content.prototype.get = async function ({ title, type, status,exclude = [], getCount, perPage = 20, page = 1 }) {

    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;
    if (getCount == 1) {
        count = (await this.db(this.tableName)
            .where(function(){
                if(type){
                    this.where('type', 'like', '%' + type + '%')
                }
            })
            .where(function(){
                if(title){
                    this.where('title', 'like', '%' + title + '%')
                }
            })
            .where(function(){
                if(exclude.length){
                    this.whereNotIn('id', exclude)
                }
            })
            .count('id as c').first())['c'];
    }
    const data = await this.db(this.tableName)
    .where(function(){
        if(type){
            this.where('type', 'like', '%' + type + '%')
        }
    })
    .where(function(){
        if(title){
            this.where('title', 'like', '%' + title + '%')
        }
    })
    .where(function(){
        if(exclude.length){
            this.whereNotIn('id', exclude)
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
// 'JSON_OBJECT("id", files.id, "uri": files.uri)'
Content.prototype.getById = async function (id) {
    return await this.db(this.tableName)
    .leftJoin('files',this.tableName+'.file_id', 'files.id' )
    .select([this.tableName+'.*', 'files.id as file_id', 'files.uri as uri'])
    .where(this.tableName+'.id', id).first()
}

Content.prototype.create = async function ({ title, type, caption,  content_body, created_by,  status, file_id }) {
    const id = await this.db(this.tableName).insert({
        title, type, caption, caption, content_body, created_by, status, file_id:file_id??null,
        created_at: new Date(),
        updated_at: new Date(),
    })
    return this.getById(id)
}

Content.prototype.update = async function (id, { title, type, caption,  content_body, created_by,  status, file_id }) {
    return await this.db(this.tableName).where('id', id).update({
        title, type, caption, caption, content_body, last_updated_by: created_by,  status, file_id:file_id??null,
        updated_at: new Date(),
    })
}

Content.prototype.delete = async function (id) {
    let tb = this.tableName;
    return await this.db.transaction(async function(trx){
        await trx.from('section_content').where('content_id', id).del()
        return await trx.from(tb).where('id', id).del();
    })
    
}

Object.setPrototypeOf(Content.prototype, BaseModel.prototype)

module.exports = { Content }