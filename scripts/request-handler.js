function getIndex(req, res) {
    res.render('index');
}

function getProfile(req, res, userData) {
    res.render('profile', { userData });
}

function getIncomeStrings(req, res, incomeStringsData) {
    res.render('income-strings', { incomeStringsData });
}

module.exports.getIndex = getIndex;
module.exports.getProfile = getProfile;
module.exports.getIncomeStrings = getIncomeStrings;