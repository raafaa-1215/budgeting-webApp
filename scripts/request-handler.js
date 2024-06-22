function getIndex(req, res) {
    if(req.session.loggedin) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
}

function getLoginForm(req, res) {
    let error = {};
    res.render('login', { error });
}

function authenticateUserLogin(req, res, connection) {
    let username = req.body.username;
	let password = req.body.password;
    let query = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
	connection.query(query, function(err, rows) {
		if (err) throw err;
			
        if (rows.length > 0) {
			req.session.loggedin = true;
            req.session.userId = rows[0].id;
            req.session.save();
            res.redirect('/');
		} else {
            let error = 'Username or password are incorrect';
            res.render('login', { error });
		}
		res.end();
	});
}

function getSignupForm(req, res) {
    let error = {};
    res.render('signup', { error });
}

function authenticateUserSignup(req, res, connection) {
    let username = req.body.username;
    let email = req.body.email;
	let password = req.body.password;
    let joinDate = req.body.joinDate;

    if(username.trim() == '' || email.trim() == '' || password.trim() == '') {
        let error = 'Fields cannot remain empty';
        res.render('signup', { error });
    }

    let query = `SELECT * FROM users WHERE username = '${username}'`;
    connection.query(query, function(err, rows) {
		if (err) throw err;
		
        if(rows.length > 0) {
            let error = 'User already exists';
            res.render('signup', { error });
        } else {
            let query = `INSERT INTO users(username, email, password, joinDate) VALUES ('${username}','${email}', '${password}', '${joinDate}')`;
            connection.query(query, function(err, rows) {
                if (err) throw err;
                
                res.redirect('/login')
            });
        }
	});
}

function getProfile(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT * FROM users WHERE id = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;
    
            let userData = rows;
            res.render('profile', { userData });
        });
    }
}

function getIncomeStrings(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT * FROM income_strings WHERE userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let incomeStringsData = rows;
            res.render('income-strings', { incomeStringsData });
        });
    }
}

function getLiquidIncome(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT liquid_incomes.id, income_strings.name, taxes.percentage, liquid_incomes.amount, liquid_incomes.dateAdded, liquid_incomes.lastEditDate 
        FROM liquid_incomes INNER JOIN income_strings ON liquid_incomes.incomeId = income_strings.id
        INNER JOIN taxes ON liquid_incomes.taxId = taxes.id
        WHERE liquid_incomes.userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let liquidIncomeData = rows;
            res.render('liquid-income', { liquidIncomeData });
        });
    }
}

function getTaxes(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT * FROM taxes WHERE userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let taxesData = rows;
            res.render('taxes', { taxesData });
        });
    }
}

function getExpenses(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT * FROM expenses WHERE userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let expensesData = rows;
            res.render('expenses', { expensesData });
        });
    }
}

function getBudgeting(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT budgeting.id, income_strings.name as incomeName, expenses.name as expenseName, budgeting.dateAdded
        FROM budgeting INNER JOIN expenses ON budgeting.expenseId = expenses.id
        INNER JOIN liquid_incomes ON budgeting.liquidIncomeId = liquid_incomes.id
        INNER JOIN income_strings ON liquid_incomes.incomeId = income_strings.id
        WHERE budgeting.userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let budgetingData = rows;
            res.render('budgeting', { budgetingData });
        });
    }
}

module.exports.getIndex = getIndex;
module.exports.getLoginForm = getLoginForm;
module.exports.authenticateUserLogin = authenticateUserLogin;
module.exports.getSignupForm = getSignupForm;
module.exports.authenticateUserSignup = authenticateUserSignup;
module.exports.getProfile = getProfile;

module.exports.getIncomeStrings = getIncomeStrings;
module.exports.getLiquidIncome = getLiquidIncome;
module.exports.getTaxes = getTaxes;
module.exports.getExpenses = getExpenses;
module.exports.getBudgeting = getBudgeting;