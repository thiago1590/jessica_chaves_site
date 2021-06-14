const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const engines = require('consolidate');
const path = require('path');

const paymentsRoute = require('./src/routes/paymentsRoute');

require('./src/config/getEnv')()

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");

app.use('/payments',paymentsRoute);

app.listen(process.env.API_PORT, function(err){
    if(err) console.error(err);
    console.log(`API INICIADA NA PORTA ${process.env.API_PORT}`) 
});