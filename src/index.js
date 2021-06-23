const express = require('express');
const cors = require('cors');
const path = require('path');

const paymentsRoute = require('./routes/paymentsRoute');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json());


app.use(express.static(path.join(__dirname, "..", "public"))
)
app.set("views", path.join(__dirname, "..", "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")

app.use('/payments',paymentsRoute);

app.listen(3333, function(err){
    if(err) console.error(err);
    console.log(`API INICIADA NA PORTA 3333`) 
});