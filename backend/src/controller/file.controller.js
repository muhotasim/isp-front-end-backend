const { Files } = require("../model/File");
const fs = require('fs')
const fspromise = require('fs/promises')
const { responseBuilder, FILE_FIELD } = require("../utils");
const files = new Files()
const sharp = require('sharp')
const cropToSizes = [{ width: 128, height: 128 },{ width: 256, height: 256 }]
const index = async (req, res, next) => {
    try {
        const { type, name, perPage = 20, page = 1, getCount } = req.query;
        return res.status(200).send(responseBuilder(200, await files.get({ type, name, perPage, page, getCount }), 'Files data fetched successfully'))
    } catch (e) {
        return next(e);
    }
}

const create = async (req, res, next) => {
    const { type } = req.body;
    try {
        const file = req[FILE_FIELD];
        if(type=='image'){
            
            for(let f of cropToSizes){
                const rFile = await sharp(await fspromise.readFile(file.path))
                .resize({ width: f.width, height: f.height })
                .toBuffer()
                await fspromise.writeFile(file.destination+(file.filename.split('.').join(`${f.width}x${f.height}.`)),rFile,)
            }
        }
        
        return res.status(200).send(responseBuilder(200, await files.create({ type, created_by: req.user_id, location: file.path, uri: file.loc, ext: file.ext, original_name: file.originalname }), 'File has been uploaded successfully'))
    } catch (e) {
        return next(e);
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await files.getById(id)
        let dFIle = await files.delete(id)
        
        await fspromise.unlink(data.location);
        for(let f of cropToSizes){
            await fspromise.unlink(data.location.split('.').join(`${f.width}x${f.height}.`));
        }
        return res.status(200).send(responseBuilder(200, dFIle, 'File has been removed successfully'));
    } catch (e) {
        return next(e);
    }
}
module.exports = { index, create, remove }
