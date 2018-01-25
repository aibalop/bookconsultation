'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine' , 'pug');
app.set('views','./views');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/" , (req , res) => {
	res.status(200).render('inicio',{
		title : "Inicio"
	});
});

app.get('/info',(req, res)=>{
	res.status(200).render('info',{
		title : "Información"
	});
});

app.post('/login',(req, res) => {
	console.log(req.body);
	if (req.body.txtUser == 'alan' && req.body.txtPass == 'oka') {
		res.status(200).redirect('/info');
	}else{
		res.status(200).render('inicio',{
			mensaje : "Datos incorrectos"
		});
	}
});


app.listen(3000,() => {
	console.log("run...");
});
