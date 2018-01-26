'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "x675ax6a767sa6x7a6",
    resave: true,
    saveUninitialized: true
}));

function auth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(200).redirect('/');
    }
}

app.get("/login", (req, res) => {
    res.status(200).render('login', {
        title: "OpenBooks | Iniciar Sesión"
    });
});

app.get('/', (req, res) => {
    res.status(200).render('index', {
        title: "OpenBooks | Your guid´s consulting",
        usuario: req.session.user
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(_ => {
        console.log("logout");
        res.status(200).redirect('/');
    });
});

app.post('/login_process', (req, res) => {
    console.log(req.body);
    if (req.body.txtUser == 'alan' && req.body.txtPass == 'oka') {
        req.session.user = req.body.txtUser;
        res.status(200).redirect('/');
    } else {
        res.status(200).render('login', {
        	title : "OpenBooks | Iniciar Sesión",
            mensaje: "Datos incorrectos"
        });
    }
});

app.listen(3000, () => {
    console.log("run...");
});