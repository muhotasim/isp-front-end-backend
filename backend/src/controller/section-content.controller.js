const { Section } = require('../model/Section');
const { responseBuilder, Validator } = require("../utils");
const section = new Section();

const index = async (req, res, next) => {
    try{
        const { content_id, section_id,  perPage, page  } = req.query;
        return res.status(200).send(responseBuilder(200, await section.getSectionContent({ content_id, section_id, perPage, page }), 'Successfully fetched data'))
    }catch(e){
        return next(e);
    }
}


const insertBulk = async (req, res, next) => {
    try{
        const contents = JSON.parse(req.body.contents)
        return res.status(200).send(responseBuilder(200, await section.createSectionContentBulk({ content:contents }), 'Section content has been created successfully'))
    }catch(e){
        return next(e);
    }
}

const deleteBulk = async (req, res, next) => {
    try{
        let queryObj = {

        }
        if(req.query.section_id){
            queryObj.section_id = req.query.section_id;
        }
        if(req.query.content_id){
            queryObj.content_id = req.query.content_id;
        }
        return res.status(200).send(responseBuilder(200, await section.deleteContentSection(queryObj), 'Section content has been deleted successfully'))
    }catch(e){
        return next(e);
    }
}

module.exports = { index, insertBulk, deleteBulk }