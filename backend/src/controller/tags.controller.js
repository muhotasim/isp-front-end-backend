const { Tags } = require("../model/Tags");
const { responseBuilder, Validator } = require("../utils");
const tag = new Tags();

const index = async (req, res, next) => {
    const { title,  perPage = 20, page = 1, getCount } = req.query;
    try {
        return res.status(200).send(responseBuilder(200, await tag.get({ title,  perPage, page, getCount }), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}
const create = async (req, res, next) => {
    const {
        title,  content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    } = req.body;
    const validator = await Validator([
        {
            key: 'title',
            message: 'Invalid Title',
            required: true
        },
        {
            key: 'meta_title',
            message: 'Invalid Meta Title',
            required: true
        },
        {
            key: 'meta_key',
            message: 'Invalid Meta Key',
            required: true
        },
        {
            key: 'meta_description',
            message: 'Invalid Meta Description',
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
        title,  content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    });

    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(200, {}, validator.messages))
    }
    try {
        return res.status(200).send(responseBuilder(200, await tag.create({
            title,  content_body, created_by, meta_title,
            meta_key, meta_description, no_follow, no_index, status, created_by: req.user_id
        }), 'Tag has been created successfully'))
    } catch (e) {
        return next(e);
    }
}
const get = async (req, res, next) => {
    try {
        const pageData = await tag.getById(req.params.id)
        if(pageData) return res.status(200).send(responseBuilder(200, pageData, 'Tag has been fetched successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const update = async (req, res, next) => {
    const {
        title,  content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    } = req.body;
    const validator = await Validator([
        {
            key: 'title',
            message: 'Invalid Title',
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
        title,  content_body, created_by, meta_title,
        meta_key, meta_description, no_follow, no_index, status
    });

    if (!validator.isAcceptable) {
        return res.status(400).send(responseBuilder(200, {}, validator.messages))
    }
    try {
        const response = await tag.update(req.params.id, {
            title,  content_body, created_by, meta_title,
            meta_key, meta_description, no_follow, no_index, status, created_by: req.user_id
        })
        if(response)return res.status(200).send(responseBuilder(200, response, 'Tag has been updated successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const remove = async (req, res, next) => {
    try {
        const pageData =  await tag.delete(req.params.id)
        if(pageData)return res.status(200).send(responseBuilder(200,pageData, 'Tag has been deleted successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}


module.exports = { index, create, get, update, remove };