function getIndex(req, res) {
    if(req.session.loggedin) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
}

function getLoginForm(req, res, path) {
    res.sendFile(path.join(__dirname + '/../static/login.html'));
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
            res.send('/login');
		}
		res.end();
	});
}

function getSignupForm(req, res, path) {
    res.sendFile(path.join(__dirname + '/../static/signup.html'));
}

function authenticateUserSignup(req, res, connection) {
    let username = req.body.username;
    let email = req.body.email;
	let password = req.body.password;
    let joinDate = req.body.joinDate;
    
    let query = `INSERT INTO users(username, email, password, joinDate) VALUES ('${username}','${email}', '${password}', '${joinDate}')`;
	connection.query(query, function(err, rows) {
		if (err) throw err;
		
        res.redirect('/login');
		res.end();
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
        let query = `SELECT * FROM liquid_incomes WHERE userId = ${userId}`;
        connection.query(query, function(err, rows) {
            if(err) throw err;

            let liquidIncomeData = rows;
            res.render('liquid-income', { liquidIncomeData });
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