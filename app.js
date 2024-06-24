// node imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const methodOverride = require('method-override');
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
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// index page endpoint
app.get("/", (req, res) => {handler.getIndex(req, res, getConnection());});

// charts endpoints
const routerCharts = express.Router();
routerCharts.get("/incomeStrings", (req, res) => {handler.getIncomeStringsChart(req, res, getConnection());});
routerCharts.get("/taxes", (req, res) => {handler.getTaxesChart(req, res, getConnection());});
routerCharts.get("/amountLeft", (req, res) => {handler.getAmountLeftChart(req, res, getConnection());});
app.use('/chart', routerCharts);

// login page endpoints
const routerLogin = express.Router();
routerLogin.get('/', (req, res) => {handler.getLoginForm(req, res, path);})
routerLogin.post('/', (req, res) => {handler.authenticateUserLogin(req, res, getConnection());});
app.use('/login', routerLogin);

// logout endpoint
app.get('/logout', (req, res) => {handler.getLogout(req, res)});

// signup page endpoints
const routerSignup = express.Router();
routerSignup.get('/', (req, res) => {handler.getSignupForm(req, res, path);})
routerSignup.post('/', (req, res) => {handler.authenticateUserSignup(req, res, getConnection());});
app.use('/signup', routerSignup);

// profile page endpoints
app.get('/profile', (req, res) => {handler.getProfile(req,res, getConnection());});

// income strings page endpoints
const routerIncomeString = express.Router();
routerIncomeString.get('/', (req, res) => {handler.getIncomeStrings(req,res, getConnection());});
routerIncomeString.post('/', (req, res) => {handler.addIncomeString(req,res, getConnection());});
app.use('/incomeStrings', routerIncomeString);

// taxes page endpoints
const routerTaxes = express.Router();
routerTaxes.get('/', (req, res) => {handler.getTaxes(req,res, getConnection());});
routerTaxes.post('/', (req, res) => {handler.addTax(req,res, getConnection());});
app.use('/taxes', routerTaxes);

// liquid income page endpoints
const routerLiquidIncomes = express.Router();
routerLiquidIncomes.get('/', (req, res) => {handler.getLiquidIncomes(req,res, getConnection());});
routerLiquidIncomes.post('/', (req, res) => {handler.addLiquidIncome(req,res, getConnection());});
app.use('/liquidIncomes', routerLiquidIncomes);

// expenses page endpoints
const routerExpenses = express.Router();
routerExpenses.get('/', (req, res) => {handler.getExpenses(req,res, getConnection());});
routerExpenses.post('/', (req, res) => {handler.addExpense(req,res, getConnection());});
app.use('/expenses', routerExpenses);

// expenses page endpoints
const routerBudgeting = express.Router();
routerBudgeting.get('/', (req, res) => {handler.getBudgeting(req,res, getConnection());});
routerBudgeting.post('/', (req, res) => {handler.addBudget(req,res, getConnection());});
app.use('/budgeting', routerBudgeting);

// edit pages endpoints
const routerEditPages = express.Router();
routerEditPages.get('/incomeString/:id', (req, res) => {handler.getEditIncomeString(req,res, getConnection());})
routerEditPages.post('/incomeString/:id', (req, res) => {handler.editIncomeString(req,res, getConnection());})
routerEditPages.get('/tax/:id', (req, res) => {handler.getEditTax(req,res, getConnection());})
routerEditPages.post('/tax/:id', (req, res) => {handler.editTax(req,res, getConnection());})
routerEditPages.get('/expense/:id', (req, res) => {handler.getEditExpense(req,res, getConnection());})
routerEditPages.post('/expense/:id', (req, res) => {handler.editExpense(req,res, getConnection());})
app.use('/editPages', routerEditPages);

// delete pages endpoints
const routerDelete = express.Router();
routerDelete.get('/incomeString/:id', (req, res) => {handler.deleteIncomeString(req,res, getConnection());})
routerDelete.get('/tax/:id', (req, res) => {handler.deleteTax(req,res, getConnection());})
routerDelete.get('/liquidIncome/:id', (req, res) => {handler.deleteLiquidIncome(req,res, getConnection());})
routerDelete.get('/expense/:id', (req, res) => {handler.deleteExpense(req,res, getConnection());})
routerDelete.get('/budget/:id', (req, res) => {handler.deleteBudget(req,res, getConnection());})
app.use('/delete', routerDelete);

app.listen(port, function () {
    console.log(`app running at http://localhost:${port}`);
});