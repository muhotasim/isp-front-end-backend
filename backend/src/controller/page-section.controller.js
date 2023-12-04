const { Section } = require('../model/Section');
const { responseBuilder, Validator } = require("../utils");
const section = new Section()

const index = async (req, res, next) => {
    try {
        const { page_id, section_id } = req.query;

        return res.status(200).send(responseBuilder(200, await section.getPageSection({ page_id, section_id }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}


const create = async (req, res, next) => {
    const { page_id, section_id, serial = 0 } = req.body;
    const validator = await Validator([
        {
            key: 'page_id',
            message: 'invalid page id',
            required: true
        },
        {
            key: 'section_id',
            message: 'invalid section id',
            required: true
        },
    ], { page_id, section_id })
    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(400, {}, validator.messages))
    }
    try {
        return res.status(200).send(responseBuilder(200, await section.createPageSection({ page_id, section_id, serial }), 'Page section has been created successfully'))
    } catch (e) {
        return next(e);
    }
}

const bulk = async (req, res, next) => {
    try {
        const contents = JSON.parse(req.body.contents)
        return res.status(200).send(responseBuilder(200, await section.createPageSectionBulk({ content: contents }), 'Page section has been created successfully'))
    } catch (e) {
        return next(e);
    }
}

const update = async (req, res, next) => {

    try {
        const { page_id, section_id, serial = 0 } = req.body;
        const validator = await Validator([
            {
                key: 'title',
                message: 'invalid title',
                required: true
            },
            {
                key: 'status',
                message: 'invalid status',
                test: /(0|1)/
            }
        ], { page_id, section_id })
        if (!validator.isAcceptable) {
            return res.status(400).send(responseBuilder(200, {}, validator.messages))
        }
        const response = await section.updatePageSection({ p_id: req.params.page_id, s_id: req.params.section_id }, { page_id, section_id, serial })
        if(response)return res.status(200).send(responseBuilder(200, response, 'Page Section has been updated successfully'))
        return next(404);
    } catch (e) {
        return next(e);
    }
}
const remove = async (req, res, next) => {
    try {
        let queryObj = {

        }
        if(req.query.section_id){
            queryObj.section_id = req.query.section_id;
        }
        if(req.query.page_id){
            queryObj.page_id = req.query.page_id;
        }
        let removedData = await section.deletePageSection(queryObj);
        if(removedData==1) return res.status(200).send(responseBuilder(200, removedData, 'Page Section has been removed successfully'))
        return res.status(200).send(responseBuilder(200, removedData, 'No resource to be found'))
    } catch (e) {
        return next(e);
    }
}

module.exports = { index, create, bulk, update, remove };