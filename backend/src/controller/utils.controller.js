const fs = require('fs');
const path = require('path');
const { responseBuilder } = require('../utils');
const getLogs =async (req, res, next)=>{
    try{
        let files = fs.readdirSync(path.join(__dirname,'../../log'))
        return res.send(responseBuilder(200,{ data:files,  }, "Fetching the log data was successful"))
    }catch(e){
        return next(e)
    }
}
const removeLogs =async (req, res, next)=>{
    try{
        let files = fs.unlinkSync(path.join(__dirname,'../../log/'+req.params.filename));
        return res.send(responseBuilder(200,{ data: files  }, "Removing the  Log: "+req.params.filename+" was successful"))
    }catch(e){
        return next(e)
    }
}
const readLog =async (req, res, next)=>{
    try{
        let files = fs.readFileSync(path.join(__dirname,'../../log/'+req.params.filename), {encoding:'utf8', flag:'r'});
        return res.send(responseBuilder(200,{ data: files  }, "Reading the Log: "+req.params.filename+" was successful"))
    }catch(e){
        return next(e)
    }
}


module.exports = { getLogs, readLog, removeLogs };