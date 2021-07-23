const Test = require('./models/test')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', '로그인 후에 이용하실 수 있습니다.')
        return res.redirect('/login');
    }
    next();
}

module.exports.isAuthorized = async (req, res, next) => {
    const { id } = req.params;
    const test = await Test.findById(id).populate("author");
    if (!res.locals.currentUser || !res.locals.currentUser._id.equals(test.author._id)) {
        return res.render('notAuthorized')
    }
    next();
}