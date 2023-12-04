const { Page } = require("../model/Page");
const { responseBuilder, Validator } = require("../utils");
const pageModal = new Page();

const index = async (req, res, next) => {
    const { title, type, perPage = 20, page = 1, getCount } = req.query;
    try {
        return res.status(200).send(responseBuilder(200, await pageModal.get({ title, type, perPage, page, getCount }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}
const create = async (req, res, next) => {
    const {
        title, type, content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status, p_css
    } = req.body;
    const validator = await Validator([
        {
            key: 'title',
            message: 'Invalid Title',
            required: true
        },
        {
            key: 'type',
            message: 'Invalid Type',
            test: /(system|user_created)/,
            required: true
        },
        {
            key: 'meta_title',
            message: 'Invalid Meta Title',
            required: true
        },
        {
            key: 'no_follow',
            message: 'Invalid No Follow',
            test: /(0|1)/
        },
        {
            key: 'no_index',
            message: 'Invalid No Index',
            test: /(0|1)/
        },
        {
            key: 'status',
            message: 'invalid status',
            test: /(0|1)/,
        }
    ], {
        title, type, content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    });

    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(200, {}, validator.messages))
    }
    try {
        return res.status(200).send(responseBuilder(200, await pageModal.create({
            title, type, content_body, created_by, meta_title,
            meta_key, meta_description, no_follow, no_index, status, created_by: req.user_id, p_css
        }), 'Page has been created successfully'))
    } catch (e) {
        return next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const pageData = await pageModal.getById(req.params.id)
        if(pageData) return res.status(200).send(responseBuilder(200, pageData, 'Page has been fetched successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const update = async (req, res, next) => {
    const {
        title, type, content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status,p_css
    } = req.body;
    const validator = await Validator([
        {
            key: 'title',
            message: 'Invalid Title',
            required: true
        },
        {
            key: 'type',
            message: 'Invalid Type',
            test: /(system|user_created)/,
            required: true
        },
        {
            key: 'meta_title',
            message: 'Invalid Meta Title',
            required: true
        },
        {
            key: 'no_follow',
            message: 'Invalid No Follow',
            test: /(0|1)/
        },
        {
            key: 'no_index',
            message: 'Invalid No Index',
            test: /(0|1)/
        },
        {
            key: 'status',
            message: 'invalid status',
            test: /(0|1)/,
        }
    ], {
        title, type, content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    });

    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(200, {}, validator.messages))
    }
    try {
        const response = await pageModal.update(req.params.id, {
            title, type, content_body, created_by, meta_title,
            meta_key, meta_description, no_follow, no_index, status, created_by: req.user_id, p_css
        })
        if(response)return res.status(200).send(responseBuilder(200, response, 'Page has been updated successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const remove = async (req, res, next) => {
    try {
        const pageData =  await pageModal.delete(req.params.id)
        if(pageData)return res.status(200).send(responseBuilder(200,pageData, 'Page has been deleted successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}


module.exports = { index, create, get, update, remove };