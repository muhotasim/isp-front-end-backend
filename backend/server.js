const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const app = express();
const { config } = require('dotenv');
const { resolve, join } = require('path');
config({path: resolve(__dirname, './.env')});
const router = require('./src/routes');
const { db } = require('./src/utils');
const HTTP_PORT = process.env.PORT;

app.use(express.static(join(__dirname,'/public')));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: process.env.ALLOWED_CONTROL_ALLOW_ORIGIN, methods:['GET','POST','DELETE','UPDATE','PUT','PATCH'] }));


app.use(router);

// cron.schedule('* * * * *', () => {
//     console.log('running twice every minute');
// });
const listen = (PORT,processId) => {
    console.info(`server is running at PORT=${PORT} and processid of the instanse is ${processId}`);
};
db.select('*').from('settings').then(function(rows) {
    
    let settings = {}
    rows.forEach(setting=>{
        settings[setting.name] = setting.value
    })
    app.locals.settings = settings;
    app.listen(HTTP_PORT, ()=>listen(HTTP_PORT, ''))
}).catch(e=>{
    console.error(e)
})

