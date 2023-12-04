const { Settings } = require('../model/Settings');
const { responseBuilder, Validator } = require("../utils");
const settings = new Settings()

const index = async (req, res, next) => {
    try {
        return res.status(200).send(responseBuilder(200, await settings.get(), 'Successfully fetched data'))
    } catch (e) {
        return next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const settingsData = await settings.getById(req.params.name)
        if(settingsData)return res.status(200).send(responseBuilder(200, settingsData, 'settings has been fetched successfully'))
        return next(404)
    } catch (e) {
        return next(e);
    }
}
const update = async (req, res, next) => {

    try {
        const { value } = req.body;
        const validator = await Validator([
            {
                key: 'value',
                message: 'invalid value',
                required: true
            }
        ], { value })

        const updatedResult =  await settings.update(req.params.name, {value})
        req.app.locals.settings = await settings.getGlobalSettings();
        return res.status(200).send(responseBuilder(200,updatedResult, 'settings has been updated successfully'))
    } catch (e) {
        return next(e);
    }
}

module.exports = { index,  get, update };