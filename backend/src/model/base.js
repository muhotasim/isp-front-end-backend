const { db, textToSlug } = require("../utils");

function BaseModel() {
}
BaseModel.prototype.db = db;
BaseModel.prototype.save = async function (Model) {
    if (Model instanceof BaseModel) {
        const keys = Object.getOwnPropertyNames(Model);
        const dataObj = {};
        keys.forEach(key => {
            dataObj[key] = Model[key]
        })
        return await this.db(Model.tableName).insert(dataObj)
    }
}

BaseModel.prototype.buildAndSavePermalink = async function(title, tableName, id){
    let slug = `${ tableName=='tags'?'tags/':'' }${textToSlug(title)}`;
    let permalinks = (await this.db('permalinks').count('id as c').where('permalink','like', `${slug}%`).first())['c']
    
    slug = `${slug}${permalinks>0?`-${permalinks}`:''}`;
    
    return await await this.db('permalinks').insert({permalink: slug, type: tableName=='tags'?'tag':tableName=='categories'?'category':'page', id});

}

module.exports = { BaseModel }