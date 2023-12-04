const { db } = require("../utils");
const { BaseModel } = require("./base")
function Section() {

}
Section.prototype.tableName = "sections";
Section.prototype.getAll = async function ({ status = 1 }) {
    const data = await this.db(this.tableName).select('id','title', 'name').where('status', status);
    const response = {
        data
    }
    return response;
}

Section.prototype.getSectionContent = async function({ content_id, section_id, getCount, perPage = 20, page = 1 }){
    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;
    if (getCount == 1) {
        count = (await this.db('section_content')
        .join('contents','contents.id', 'section_content.content_id')
        .where(function(){
             if(content_id){
                 this.where('section_content.content_id', content_id)
             }
         })
         .orWhere(function(){
             if(section_id){
                 this.orWhere('section_content.section_id', section_id)
             }
         }).first())['c']
    }

    const data = await this.db('section_content')
                           .join('contents','contents.id', 'section_content.content_id')
                           .where(function(){
                                if(content_id){
                                    this.where('section_content.content_id', content_id)
                                }
                            })
                            .orWhere(function(){
                                if(section_id){
                                    this.orWhere('section_content.section_id', section_id)
                                }
                            })
                            .orderBy('id','DESC')
                            .limit(perPage, { skipBinding: true })
                            .offset(offset);

    const response = {
        data
    }
    if (getCount == 1) response.count = count;
    return response;
}
Section.prototype.get = async function ({ title, getCount, perPage = 20, page = 1 }) {

    let offset = (parseInt(perPage) * (parseInt(page) - 1))
    let count = null;
    if (getCount == 1) {
        count = (await this.db(this.tableName)
            .where(function(){
                if(title){
                    this.where('title', 'like', '%' + title + '%')
                }
            })
            .count('id as c').first())['c'];
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

Section.prototype.getPageSection = async function ({ page_id, section_id }) {
    const data = await this.db('page_section')
    .join('pages','pages.id','page_section.page_id')
    .join('sections','sections.id','page_section.section_id')
    .select('pages.title as page_title','sections.title as section_title', 'sections.id as section_id', 'pages.id as page_id')
    .where(function(){
        if(section_id){
            this.where('page_section.section_id', 'like', '%' + section_id + '%')
        }
    })
    .where(function(){
        if(page_id){
            this.where('page_section.page_id', 'like', '%' + page_id + '%')
        }
    })
    const response = {
        data
    }
    return response;
}


Section.prototype.getById = async function (id) {
    return await this.db(this.tableName).where('id', id).first()
}

Section.prototype.create = async function ({ title, status,created_by, type, name }) {
    const id = await this.db(this.tableName).insert({
        title, created_by,  status, type, name
    })
    return this.getById(id)
}

Section.prototype.createPageSection = async function ({ page_id, section_id, serial }) {
    const id = await this.db('page_section').insert({
        page_id, section_id, serial
    })
    return id
}

Section.prototype.createPageSectionBulk = async function ({ content }) {
    const id = await this.db('page_section').insert(content)
    return id
}

Section.prototype.createSectionContentBulk = async function ({ content }) {
    const id = await this.db('section_content').insert(content)
    return id
}


Section.prototype.updatePageSection = async function ({ p_id, s_id },{ page_id, section_id, serial }) {
    const id = await this.db('page_section').where(function(){
            this.where('page_section.section_id', 'like', '%' + s_id + '%')
    })
    .where(function(){
            this.where('page_section.page_id', 'like', '%' + p_id + '%')
    }).update({
        page_id, section_id, serial
    })
    return id
}

Section.prototype.update = async function (id, { title, created_by,name,  status, type }) {
    return await this.db(this.tableName).where('id', id).update({
        title, created_by,  status, type, name
    })
}

Section.prototype.delete = async function (id) {
    
    let tb = this.tableName;
    return await this.db.transaction(async function(trx){
        await trx.from('page_section').where('section_id', id).del();
        await trx.from('section_content').where('section_id', id).del();
        return await trx.from(tb).where('id', id).del();
    })
    
}
Section.prototype.deletePageSection = async function ({page_id, section_id}) {
    return await this.db('page_section').where(function(){
        if(section_id){
            this.where('page_section.section_id', section_id)
        }
    })
    .where(function(){
        if(page_id){
            this.where('page_section.page_id',  page_id )
        }
    }).del();
}

Section.prototype.deleteContentSection = async function ({content_id, section_id}) {
    
    return await this.db('section_content').where(function(){
        if(section_id){
            this.where('section_content.section_id', section_id)
        }
    })
    .where(function(){
        if(content_id ){
            this.where('section_content.page_id',  content_id  )
        }
    }).del();
}

Object.setPrototypeOf(Section.prototype, BaseModel.prototype)

module.exports = { Section }