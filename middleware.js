module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', '로그인 후에 이용하실 수 있습니다.')
        return res.redirect('/login');
    }
    next();
}