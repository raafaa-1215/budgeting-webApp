// index page endpoint
function getIndex(req, res) {
    if(req.session.loggedin) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
}

// login page endpoints
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

// logout endpoint
function getLogout(req, res) {
    req.session.destroy();
    res.redirect('/');
}

// signup page endpoints
function getSignupForm(req, res) {
    let error = {};
    res.render('signup', { error });
}
function authenticateUserSignup(req, res, connection) {
    let username = req.body.username;
    let email = req.body.email;
	let password = req.body.password;
    let joinDate = getCurrentDate();

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
            let query = `INSERT INTO users(username, email, password, joinDate) 
            VALUES ('${username}','${email}', '${password}', '${joinDate}')`;
            connection.query(query, function(err, rows) {
                if (err) throw err;
                
                res.redirect('/login')
            });
        }
	});
}

// profile page endpoints
function getProfile(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let userId = req.session.userId;
        let query = `SELECT * FROM users WHERE id = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;
    
            let userData = rows;
            let error = {};
            res.render('profile', { userData, error });
        });
    }
}

// income strings page endpoints
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
function addIncomeString(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let name = req.body.name;
        let description = req.body.description;
        let type = req.body.type;
        let source = req.body.source;
        let amount = req.body.amount;
        let payday = req.body.payday;
        let dateAdded = getCurrentDate();
        let lastEditDate = getCurrentDate();
        let userId = req.session.userId;
        let query = `INSERT INTO income_strings(name, description, type, source, amount, payday, dateAdded, lastEditDate, userId) 
        VALUES ('${name}', '${description}', '${type}', '${source}', ${amount}, '${payday}', '${dateAdded}', '${lastEditDate}', ${userId})`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/incomeStrings');
        });
    }
}

// taxes page endpoints
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
function addTax(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let name = req.body.name;
        let description = req.body.description;
        let percentage = req.body.percentage;
        let method = req.body.method;
        let dateAdded = getCurrentDate();
        let lastEditDate = getCurrentDate();
        let userId = req.session.userId;
        let query = `INSERT INTO taxes(name, description, percentage, method, dateAdded, lastEditDate, userId) 
        VALUES ('${name}', '${description}', '${percentage}', '${method}', '${dateAdded}', '${lastEditDate}', ${userId})`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/taxes');
        });
    }
}

// liquid income page endpoints
function getLiquidIncomes(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        var userId = req.session.userId;
        var query = `SELECT liquid_incomes.id, income_strings.name, taxes.percentage, liquid_incomes.amount, liquid_incomes.dateAdded, liquid_incomes.lastEditDate 
        FROM liquid_incomes INNER JOIN income_strings ON liquid_incomes.incomeId = income_strings.id
        INNER JOIN taxes ON liquid_incomes.taxId = taxes.id
        WHERE liquid_incomes.userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            var liquidIncomeData = rows;
            query = `SELECT id, name, amount FROM income_strings WHERE userId = ${userId}`;
            connection.query(query, function(err, rows) {
                if(err) throw err;
    
                var incomeSelect = rows;
                query = `SELECT id, name, percentage FROM taxes WHERE userId = ${userId}`;
                connection.query(query, function(err, rows) {
                    if(err) throw err;
        
                    var taxSelect = rows;
                    res.render('liquid-income', { liquidIncomeData, incomeSelect, taxSelect });
                });
            });
        });
    }
}
function addLiquidIncome(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        var incomeId = req.body.incomeId;
        var taxId = req.body.taxId;
        var dateAdded = getCurrentDate();
        var lastEditDate = getCurrentDate();
        let userId = req.session.userId;
        var query = `SELECT (income_strings.amount - (income_strings.amount * (taxes.percentage / 100))) as amount
        FROM income_strings, taxes
        WHERE taxes.id = ${taxId} AND income_strings.id = ${incomeId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            var amount = rows[0].amount;
            query = `INSERT INTO liquid_incomes(incomeId, taxId, amount, dateAdded, lastEditDate, userId) 
            VALUES (${incomeId}, ${taxId}, ${amount}, '${dateAdded}', '${lastEditDate}', ${userId})`;
            connection.query(query, function(err, rows) {
                if(err) throw err;

                res.redirect('/liquidIncomes');
            });
        });
    }
}

// expenses page endpoints
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
function addExpense(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let name = req.body.name;
        let description = req.body.description;
        let type = req.body.type;
        let amount = req.body.amount;
        let paymentDay = req.body.paymentDay;
        let dateAdded = getCurrentDate();
        let lastEditDate = getCurrentDate();
        let userId = req.session.userId;
        let query = `INSERT INTO expenses(name, description, type, amount, paymentDay, dateAdded, lastEditDate, userId) 
        VALUES ('${name}', '${description}', '${type}', ${amount}, '${paymentDay}', '${dateAdded}', '${lastEditDate}', ${userId})`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/expenses');
        });
    }
}

// expenses page endpoints
function getBudgeting(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        var userId = req.session.userId;
        var query = `SELECT budgeting.id, income_strings.name as incomeName, expenses.name as expenseName, budgeting.amountLeft, budgeting.dateAdded
            FROM budgeting INNER JOIN expenses ON budgeting.expenseId = expenses.id
            INNER JOIN liquid_incomes ON budgeting.liquidIncomeId = liquid_incomes.id
            INNER JOIN income_strings ON liquid_incomes.incomeId = income_strings.id
            WHERE budgeting.userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;
        
            var budgetingData = rows;
            query = `SELECT liquid_incomes.id, income_strings.name, liquid_incomes.amount 
            FROM liquid_incomes INNER JOIN income_strings ON liquid_incomes.incomeId = income_strings.id
            WHERE liquid_incomes.userId = ${userId}`;
            connection.query(query, function(err, rows) {
                if(err) throw err;
            
                var liquidIncomeSelect = rows;
                query = `SELECT id, name, amount FROM expenses WHERE userId = ${userId}`;
                connection.query(query, function(err, rows) {
                    if(err) throw err;
                
                    var expenseSelect = rows;
                    res.render('budgeting', { budgetingData, liquidIncomeSelect, expenseSelect });
                });
            });
        });
    }
}
function addBudget(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        var liquidIncomeId = req.body.liquidIncomeId;
        var expenseId = req.body.expenseId;
        var dateAdded = getCurrentDate();
        let userId = req.session.userId;
        var query = `SELECT (liquid_incomes.amount - expenses.amount) as amount
        FROM liquid_incomes, expenses
        WHERE liquid_incomes.id = ${liquidIncomeId} AND expenses.id = ${expenseId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            var amountLeft = rows[0].amount;
            query = `INSERT INTO budgeting(liquidIncomeId, expenseId, amountLeft, dateAdded, userId) 
            VALUES (${liquidIncomeId}, ${expenseId}, ${amountLeft}, '${dateAdded}', ${userId})`;
            connection.query(query, function(err, rows) {
                if(err) throw err;

                res.redirect('/budgeting');
            });
        });
    }
}

// edit pages endpoints
function getEditIncomeString(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let {id} = req.params;
        let query = `SELECT * FROM income_strings WHERE id = ?`;
        connection.query(query, [id], function(err, rows) {
            if(err) throw err;

            let incomeStringData = rows[0];
            res.render('income-strings-edit', { incomeStringData });
        });
    }
}
function editIncomeString(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let id = req.body.id;
        let name = req.body.name;
        let description = req.body.description;
        let type = req.body.type;
        let source = req.body.source;
        let amount = req.body.amount;
        let payday = req.body.payday;
        let lastEditDate = getCurrentDate();
        let query = `UPDATE income_strings 
        SET name = '${name}', description = '${description}', type = '${type}', source = '${source}', amount = ${amount}, payday = '${payday}', lastEditDate = '${lastEditDate}'
        WHERE id = ${id}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/incomeStrings');
        });
    }
}
function getEditTax(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let {id} = req.params;
        let query = `SELECT * FROM taxes WHERE id = ?`;
        connection.query(query, [id], function(err, rows) {
            if(err) throw err;

            let taxData = rows[0];
            res.render('taxes-edit', { taxData });
        });
    }
}
function editTax(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let id = req.body.id;
        let name = req.body.name;
        let description = req.body.description;
        let percentage = req.body.percentage;
        let method = req.body.method;
        let lastEditDate = getCurrentDate();
        let query = `UPDATE taxes 
        SET name = '${name}', description = '${description}', percentage = '${percentage}', method = '${method}', lastEditDate = '${lastEditDate}'
        WHERE id = ${id}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/taxes');
        });
    }
}
function getEditExpense(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let {id} = req.params;
        let query = `SELECT * FROM expenses WHERE id = ?`;
        connection.query(query, [id], function(err, rows) {
            if(err) throw err;

            let expenseData = rows[0];
            res.render('expenses-edit', { expenseData });
        });
    }
}
function editExpense(req, res, connection) {
    if(!req.session.loggedin) {
        res.redirect('/login');
    } else {
        let id = req.body.id;
        let name = req.body.name;
        let description = req.body.description;
        let type = req.body.type;
        let amount = req.body.amount;
        let paymentDay = req.body.paymentDay;
        let lastEditDate = getCurrentDate();
        let query = `UPDATE expenses 
        SET name = '${name}', description = '${description}', type = '${type}', amount = ${amount}, paymentDay = '${paymentDay}', lastEditDate = '${lastEditDate}'
        WHERE id = ${id}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            res.redirect('/expenses');
        });
    }
}

// delete pages endpoints
function deleteIncomeString()



// index page endpoint export
module.exports.getIndex = getIndex;
// login page endpoints export
module.exports.getLoginForm = getLoginForm;
module.exports.authenticateUserLogin = authenticateUserLogin;
// logout endpoint export
module.exports.getLogout = getLogout;
// signup page endpoints export
module.exports.getSignupForm = getSignupForm;
module.exports.authenticateUserSignup = authenticateUserSignup;
// profile page endpoints export
module.exports.getProfile = getProfile;
// income strings page endpoints export
module.exports.getIncomeStrings = getIncomeStrings;
module.exports.addIncomeString = addIncomeString;
// taxes page endpoints export
module.exports.getTaxes = getTaxes;
module.exports.addTax = addTax;
// liquid income page endpoints export
module.exports.getLiquidIncomes = getLiquidIncomes;
module.exports.addLiquidIncome = addLiquidIncome;
// expenses page endpoints export
module.exports.getExpenses = getExpenses;
module.exports.addExpense = addExpense;
// expenses page endpoints export
module.exports.getBudgeting = getBudgeting;
module.exports.addBudget = addBudget;
// edit pages endpoints export
module.exports.getEditIncomeString = getEditIncomeString;
module.exports.editIncomeString = editIncomeString;
module.exports.getEditTax = getEditTax;
module.exports.editTax = editTax;
module.exports.getEditExpense = getEditExpense;
module.exports.editExpense = editExpense;
// delete pages endpoints export

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
}