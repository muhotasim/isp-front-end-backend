const { responseBuilder, logData, verifyandDecodeToken, verifyToken } = require("./utils");

const apiErrorAnd404Handeler = (err, req, res, next)=>{
    if(err===404) return res.status(404).send(responseBuilder(404,{}, 'The data you are looking for does not exists'));
    if(err){
        logData(req,err)
        return res.status(500).send(responseBuilder(500,{}, `Something want in the backend \n Error Message: ${err.toString()}`))
    }
    return res.status(404).send(responseBuilder(404,{}, 'The data you are looking for does not exists'));
};
const webErrorAnd404Handeler = (err, req, res, next)=>{
    if(err==404){
        return res.status(404).render('404',{ 
            title: "404 - No Data Found",
            meta_title: "404 - No Data Found",
            meta_key: '',
            meta_description: '',
            config: req.app.locals.settings,
            sectionData: [] })
    }
    if(err){
        logData(req,err)
        return res.status(500).render('500',{ title: '' })
    }
    return res.status(404).render('404',{ 
        title: "404 - No Data Found",
        meta_title: "404 - No Data Found",
        meta_key: '',
        meta_description: '',
        config: req.app.locals.settings,
        sectionData: [], pageCss: ''  })
};

const authorizationMiddleware = (req, res, next)=>{
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    if(token&&verifyToken(token)){
        const userId = verifyandDecodeToken(token)
        req.user_id = userId;
        return next();
    }else{
        return res.status(401).send(responseBuilder(401,{}, 'Authentication failed'))
    }
}
module.exports = { apiErrorAnd404Handeler, webErrorAnd404Handeler, authorizationMiddleware };