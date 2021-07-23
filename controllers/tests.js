const Test = require('../models/test');

module.exports.renderNew = (req, res) => {
    res.render('tests/new');
}

module.exports.renderCreated = async (req, res) => {
    const { testId } = req.signedCookies;
    delete req.signedCookies.testId;
    res.render('tests/created', testId);
}

// module.exports.create = 



