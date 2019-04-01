var express = require('express');
var app = express();
var db = require('./db');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/newuser', function(req, res) {
    res.render('newuser');
});

app.get('/newproduct', function(req, res) {
    res.render('newproduct');
});

app.get('/finduser', function(req, res) {
    res.render('finduser');
});

app.get('/findproduct', function(req, res) {
    res.render('finduser');
});

var UserController = require('./user/UserController');
app.use('/users', UserController);

var ProductController = require('./product/ProductController');
app.use('/products', ProductController);

module.exports = app;