// node imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const mysql = require('mysql');
// script imports
const handler = require('./scripts/request-handler.js');

const app = express();
const port = 4000;

function getConnection() {
    let connection = mysql.createConnection({
        "host": "localhost", 
        "user": "root", 
        "database": "projeto_pw",
    });
    return connection;
}

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// index page endpoint
app.get("/", (req, res) => {handler.getIndex(req, res);});

// login page and login form authentication endpoints
app.get('/login', (req, res) => {handler.getLoginForm(req, res, path);});
app.post('/login', (req, res) => {handler.authenticateUserLogin(req, res, getConnection());});

// logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// signup endpoints
app.get('/signup', (req, res) => {handler.getSignupForm(req, res, path);});
app.post('/signup', (req, res) => {handler.authenticateUserSignup(req, res, getConnection());});

// profile page endpoints
app.get("/profile", (req, res) => {handler.getProfile(req,res, getConnection());});

// income strings page endpoints
app.get("/incomeStrings", (req, res) => {handler.getIncomeStrings(req,res, getConnection());});

// liquid income page endpoints
app.get("/liquidIncome", (req, res) => {handler.getLiquidIncome(req,res, getConnection());});



app.listen(port, function () {
    console.log(`app running at http://localhost:${port}`);
});