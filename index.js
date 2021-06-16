const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const engines = require('consolidate');
const path = require('path');

const paymentsRoute = require('./src/routes/paymentsRoute');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.engine("ejs", engines.ejs);
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");

app.use('/payments',paymentsRoute);

app.listen(3333, function(err){
    if(err) console.error(err);
    console.log('API INICIADA NA PORTA 3333') 
});