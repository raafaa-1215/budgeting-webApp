// node imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// script imports
const handler = require('./scripts/request-handler.js');

const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'scripts')));

app.get("/", handler.getIndex);
var userData = {"username":"Rafa", "password":"teste123"};
app.get("/profile", (req, res) => {handler.getProfile(req,res, userData);});
var incomeStringsData = [];
app.get("/incomeStrings", (req, res) => {handler.getIncomeStrings(req,res, incomeStringsData);});

app.listen(port, function () {
    console.log(`app running at http://localhost:${port}`);
});