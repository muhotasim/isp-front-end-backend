const { db } = require("../utils");
const { BaseModel } = require("./base")
function Page() {

}
Page.prototype.tableName = "pages";

Page.prototype.getPageDataByPermalink = async function(permalink){
    const pageData =  await this.db('permalinks')
    .leftJoin(this.tableName,'permalinks.id',this.tableName+'.id')
    .leftJoin('page_section','page_section.page_id',this.tableName+'.id')
    .leftJoin('sections','page_section.section_id','sections.id')
    .where('permalinks.permalink', permalink)
    .select(this.tableName+".*",this.db.raw("JSON_ARRAYAGG(JSON_OBJECT('label',sections.title, 'value',sections.id)) as 'sections'"))
    .orderBy('page_section.serial', 'ASC')
    .groupBy(this.tableName+'.id').first()
    if(!pageData) return null;
    const sectionsData = await this.db('sections')
    .leftJoin('page_section',function(){
        this.on('page_section.page_id',pageData.id)
        .andOn('page_section.section_id', 'sections.id')
    })
    .leftJoin('section_content','section_content.section_id','sections.id')
    .leftJoin('contents','section_content.content_id','contents.id')
    .leftJoin('files','contents.file_id','files.id')
    .whereIn('sections.id', pageData.sections.map(s=>s.value))
    .select(['sections.*', 'page_section.serial',this.db.raw("JSON_ARRAYAGG(JSON_OBJECT('title',contents.title, 'type',contents.type, 'caption',contents.caption, 'content_body',contents.content_body, 'image',files.uri)) as 'contents'")])
    .orderBy('page_section.serial','ASE')
    .groupBy('sections.id');
    pageData.sectionsData = sectionsData;
    return pageData
}
Page.prototype.get = async function ({ title, type, perPage, page, getCount }) {
    const _this = this;
    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;
    if (getCount == 1) {
        count = (await this.db(this.tableName).count('id as c')
            .where(function(){
                if(title){
                    this.where('title', 'like', '%' + title + '%')
                }
            })
            .orWhere(function(){
                if(type){
                    this.orWhere('type', 'like', '%' + type + '%')
                }
            }).first())['c']
    }


    const data = await this.db(this.tableName)
        .leftJoin('permalinks',function(){
            this.on('permalinks.id','pages.id')
            .andOnVal('permalinks.type', "=", "page")
        })
        .where(function(){
            if(title){
                this.where('title', 'like', '%' + title + '%')
            }
        })
        .orWhere(function(){
            if(type){
                this.orWhere('type', 'like', '%' + type + '%')
            }
        })
        .select([this.tableName+'.*','permalinks.permalink as permalink'])
        .orderBy(this.tableName+'.id','DESC')
        .limit(perPage, { skipBinding: true })
        .offset(offset)
    const response = {
        data
    }
    if (getCount == 1) response.count = count;
    return response;
}

Page.prototype.getById = async function (id) {
    return await this.db(this.tableName)
    .leftJoin('page_section','page_section.page_id',this.tableName+'.id')
    .leftJoin('sections','page_section.section_id','sections.id')
    .where(this.tableName+'.id', id)
    .select(this.tableName+".*",this.db.raw("JSON_ARRAYAGG(JSON_OBJECT('label',sections.title, 'value',sections.id, 'serial',page_section.serial)) as 'sections'"))
    .orderBy('page_section.serial', 'ASE')
    .groupBy(this.tableName+'.id').first()
}

Page.prototype.create = async function ({
    title, type, content_body, created_by, meta_title,
    meta_key, meta_description, no_follow = 0, no_index = 0, status = 1, p_css = ''
}) {

    const id = await this.db(this.tableName).insert({
        title, type, content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status, p_css
    })
    await this.buildAndSavePermalink(title,'pages', id);
    return this.getById(id)
}

Page.prototype.update = async function (id, { title, type, content_body, created_by, meta_title,
    meta_key, meta_description, no_follow = 0, no_index = 0, status = 1, p_css = '' }) {
    return await this.db(this.tableName).where('id', id).update({
        title, type, content_body, last_updated_by: created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status, p_css
    })
}

Page.prototype.delete = async function (id) {
    let tb = this.tableName;
    return await this.db.transaction(async function(trx){
        let pageData =  await trx.from('pages').select(['type', 'id']).where('id', id)
        if(pageData[0]?.type  == 'user_created'){
            await trx.from('permalinks').where('type', 'page').where('id', id).del();
            await trx.from('page_section').where('page_id', id).del();
            return await trx.from(tb).where('id', id).del();
        }else{
            return false;
        }
        
    })
}

Object.setPrototypeOf(Page.prototype, BaseModel.prototype)

module.exports = { Page }