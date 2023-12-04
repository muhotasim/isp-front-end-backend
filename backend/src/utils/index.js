const sqliteStore = require('cache-manager-sqlite');
const cacheManager = require('cache-manager');
const multer = require('multer');
const knex = require('knex');
const md5 = require('md5');
const path = require('path');
const { appendFileSync, mkdirSync, fstat } = require('fs');
const jwt= require('jsonwebtoken');
const sharp= require('sharp');
const { readFile } = require('fs/promises');
const SYSTEM_GLOBALS = { HOME_PAGE_CACHE: 'HOME_PAGE_CACHE', OTHER_PAGE_CACHE: 'OTHER_PAGE_CACHE' };
const CACHE_TIMES = { HOME_PAGE_CACHE: 10000, OTHER_PAGE_CACHE: 3000 };
const MAX_UPLOAD_FILE_SIZE = 3072000;
const FILE_FIELD = 'file';

const sqlLiteCache = cacheManager.caching({
    store: sqliteStore,
    name: 'cache',
    path: path.resolve(__dirname, '../../cache/cache.db')
})
const responseBuilder = (status, data = {}, message = "") => {
    return {
        statusCode: status, data, message
    }
};
const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB,
        port: process.env.DB_PORT
    },
    pool: {
        min: 0,
        max: 20
    }
});

const hashMake = (pass) => {
    return md5(pass);
}
const verifyHash = (hashPass, pass) => {
    return hashPass === md5(pass);
}

const Validator = async (rules = [], data = {}, updatableFieldId) => {

    if (typeof rules != 'object' || typeof data != 'object') throw new Error('invalid arguments');
    let validator = {
        isAcceptable: true,
        messages: []
    }

    for (let ruleIndex in rules) {
        const rule = rules[ruleIndex]
        const value = data[rule.key];

        if (rule.required && !value) {
            validator.isAcceptable = false;
            validator.messages.push({ field: rule.key, message: rule.message })
        }
        if (!new RegExp(rule.test, 'gi').test(value)) {
            validator.isAcceptable = false;
            validator.messages.push({ field: rule.key, message: rule.message })
        }

        if (rule.maxLen && typeof value == 'string' && rule.maxLen < value.length) {

            validator.isAcceptable = false;
            validator.messages.push({ field: rule.key, message: rule.message })
        }

        if (rule.minLen && typeof value == 'string' && rule.minLen > value.length) {

            validator.isAcceptable = false;
            validator.messages.push({ field: rule.key, message: rule.message })
        }

        if (rule.uniqueCheck && typeof rule.uniqueCheck == 'object' && value && typeof value == 'string') {
            const { table, field } = rule.uniqueCheck;
            const countData = await db(table).count('* as c').where(field, value).where(function(){ if(updatableFieldId) this.whereNot('id', updatableFieldId)}).first()
            if (countData.c > 0) {
                validator.isAcceptable = false;
                validator.messages.push({ field: rule.key, message: rule.message })
            }
        }
    }
    validator.messages = validator.messages?.map(v=>v.message).join('\n')

    return validator;

}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const date = new Date();
        let folderLocation = path.resolve(__dirname, '../../public')
        const loc = '/uploads/'+date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()+'/'
        folderLocation+=loc;
        file.loc = loc;
        mkdirSync(folderLocation, { recursive: true });
        cb(null, folderLocation)
    },
    filename: async function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        file.ext =  path.extname(file.originalname).replace('.','');
        let nameWithOutExt = file.fieldname + '-' + uniqueSuffix+'.';
        const fileName =nameWithOutExt +file.ext;
        file.loc = file.loc+=fileName;      
        cb(null, fileName)
    }
})

const fileUploader = multer({ storage: storage, limits: { fieldSize:  MAX_UPLOAD_FILE_SIZE} });

const logData = (req,error)=>{
     const date = new Date();
     const logFileName = date.getDate()+'_'+(date.getMonth()+1)+'_'+date.getFullYear()
     appendFileSync(path.resolve(__dirname, '../../log/'+logFileName+'.log'), '\n Url: '+req.url+'\n'+error?.toString());
}

const generateToken = (data)=>{
    return jwt.sign(data, process.env.JWT_SECRET_KEY)
}
const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}
const verifyandDecodeToken = (token)=>{
    return jwt.decode(token, {secret: process.env.JWT_SECRET_KEY})
}

function textToSlug(text)
{
    return text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
}

module.exports = { textToSlug, responseBuilder, db, hashMake, verifyHash,verifyToken,Validator,logData,generateToken,verifyandDecodeToken, sqlLiteCache, SYSTEM_GLOBALS, CACHE_TIMES, FILE_FIELD, fileUploader };