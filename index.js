'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine' , 'pug');
app.set('views','./views');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/" , (req , res) => {
	res.status(200).render('inicio');
});

app.post('/sendData',(req, res) => {
	console.log(req.body);
	res.status(200).redirect('/');
});


app.listen(3000,() => {
	console.log("run...");
});
