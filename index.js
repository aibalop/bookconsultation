'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const request = require('request');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
        title: "OpenBooks | Log In"
    });
});

app.get('/', (req, res) => {
    request('http://www.etnassoft.com/api/v1/get/?get_categories=all',(errorCategories,responseCategories,bodyCategories)=>{
        if (errorCategories) {
            console.log(errorCategories);
        }

        var result_categories = bodyCategories.substring(1,bodyCategories.length-2);

        request('http://www.etnassoft.com/api/v1/get/?book=all&criteria=most_viewed',(errorBooks,responseBooks,bodyBooks)=>{
            if (errorBooks) {
                console.log(errorBooks);
            }            
            
            var result_books = bodyBooks.substring(1,bodyBooks.length-2);

            res.status(200).render('index', {
                title: "OpenBooks | Your guid´s consulting",
                usuario: req.session.user,
                categorias : JSON.parse(result_categories),
                libros : JSON.parse(result_books)
            });
        });
        
    });
});

app.get('/categoria/:categoryid', (req, res) => {
    request('http://www.etnassoft.com/api/v1/get/?get_categories=all',(errorCategories,responseCategories,bodyCategories)=>{
        if (errorCategories) {
            console.log(errorCategories);
        }

        var result_categories = bodyCategories.substring(1,bodyCategories.length-2);

        let id = req.params.categoryid;
        
        request('http://www.etnassoft.com/api/v1/get/?book=all&criteria=most_viewed&category_id=' + id,(errorBooks,responseBooks,bodyBooks)=>{
            if (errorBooks) {
                console.log(errorBooks);
            }            
            
            var result_books = bodyBooks.substring(1,bodyBooks.length-2);
            
            res.status(200).render('categoria', {
                title: "OpenBooks | Your guid´s consulting",
                usuario: req.session.user,
                categorias : JSON.parse(result_categories),
                libros : JSON.parse(result_books)
            });
        });
        
    });
});

app.post('/buscar', (req, res) => {
    console.log(req.body.txtBook);
    request('http://www.etnassoft.com/api/v1/get/?get_categories=all',(errorCategories,responseCategories,bodyCategories)=>{
        if (errorCategories) {
            console.log(errorCategories);
        }

        var result_categories = bodyCategories.substring(1,bodyCategories.length-2);

        let pattern = req.body.txtBook;
        console.log(pattern);
        request('http://www.etnassoft.com/api/v1/get/?keyword=' + pattern,(errorBooks,responseBooks,bodyBooks)=>{
            if (errorBooks) {
                console.log(errorBooks);
            }            
            
            var result_books = bodyBooks.substring(1,bodyBooks.length-2);
            
            res.status(200).render('categoria', {
                title: "OpenBooks | Your guid´s consulting",
                usuario: req.session.user,
                categorias : JSON.parse(result_categories),
                libros : JSON.parse(result_books)
            });
        });
        
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
        	title : "OpenBooks | Log In",
            mensaje: "Datos incorrectos"
        });
    }
});

app.listen(3000, () => {
    console.log("run...");
});