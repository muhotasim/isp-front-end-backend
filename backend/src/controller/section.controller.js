const { Section } = require('../model/Section');
const { responseBuilder, Validator } = require("../utils");
const section = new Section()

const index = async (req, res, next) => {
    try {
        const { title, created_by,  status, perPage = 20, page = 1, getCount } = req.query;

        return res.status(200).send(responseBuilder(200, await section.get({ title, created_by,  status, getCount, perPage, page }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}

const sectionDropDown = async (req, res, next) => {
    try {
        const { status } = req.query;

        return res.status(200).send(responseBuilder(200, await section.getAll({ status }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}
const create = async (req, res, next) => {
    const { title,   status, type, name } = req.body;
    const validator = await Validator([
        {
            key: 'title',
            message: 'invalid title',
            required: true
        },
        {
            key: 'status',
            message: 'invalid status',
            test: /(0|1)/,
        },
    ], { title,   status })
    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(400, {}, validator.messages))
    }
    try {
        return res.status(200).send(responseBuilder(200, await section.create({ title, status, created_by: req.user_id, type, name }), 'Section has been created successfully'))
    } catch (e) {
        return next(e);
    }
}
const get = async (req, res, next) => {
    try {
        let response = await section.getById(req.params.id)
        if(response) return res.status(200).send(responseBuilder(200, response, 'Section has been fetched successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const update = async (req, res, next) => {

    try {
        const { title, status, type, name } = req.body;

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
        ], { title, status })
        if (!validator.isAcceptable) {
            return res.status(400).send(responseBuilder(200, {}, validator.messages))
        }
        const response = await section.update(req.params.id, { title, status, created_by: req.user_id, type, name })
        if(response)return res.status(200).send(responseBuilder(200, response, 'Section has been updated successfully'))
        return next(404);
    } catch (e) {
        return next(e);
    }
}
const remove = async (req, res, next) => {
    try {
        let removedData = await section.delete(req.params.id);
        
        if(removedData>0) return res.status(200).send(responseBuilder(200, removedData, 'Section has been removed successfully'))
        return next();
    } catch (e) {
        return next(e);
    }
}

module.exports = { index, create, get, update, remove, sectionDropDown };