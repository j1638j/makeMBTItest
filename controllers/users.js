const Test = require('../models/test');
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res) => {
    const {username, nickname, password} = req.body;
    const user = new User({username, nickname})
    const newUser = await User.register(user, password);
    console.log(newUser);
    //should log in the user from the start
    req.login(newUser, err => {
        if(err) return next(err)
        req.flash('success', '환영합니다.')
        res.redirect('/')
    });
}

module.exports.checkUniqueEmail = async (req, res) => {
    console.log('inside of the post route')
    console.dir(req.body)
    try {
        console.log('inside of the try block of /uniqueEmail')
        const user = await User.findOne({ username: req.body.email});
        console.log('user: ', user)
        if(user) {
            console.log('User already exists')
            res.json({isEmailUnique: false});
        } else {
            console.log("User doesn't exist")
            res.json({isEmailUnique: true});
        }
    } catch (e) {
        console.log('/uniqueEmail GET route failed: ', e)
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', '로그인 되었습니다.');
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
}

module.exports.renderPersonal = (req, res) => {
    res.render('users/personal')
}

module.exports.renderChangePassword = (req, res) => {
    res.render('users/changePassword');
}

module.exports.changePassword = async (req, res) => {
    const {currentpw, newpw} = req.body;
    if(newpw === currentpw) {
        req.flash('error', '현재 비밀번호와 일치하는 비밀번호로 바꿀 수 없습니다.')
        return res.redirect('/changePassword');
    }
    const user = await User.findById(res.locals.currentUser._id);
    try{
        const changePW = await user.changePassword(currentpw, newpw);
        console.log(changePW);
        return res.redirect('/personal');
    } catch (e) {
        if (e.name === 'IncorrectPasswordError') {
            req.flash('error', '현재 비밀번호와 일치하지 않습니다.');
            return res.redirect('/changePassword')
        }
    }
}

module.exports.renderChangeNickname = (req, res) => {
    res.render('users/changeNickname');
}

module.exports.changeNickname = async(req, res) => {
    const { password, nickname } = req.body;
    const user = await User.findById(res.locals.currentUser);
    console.log('user: ', user)
    const userAuth = await user.authenticate(password)
    console.log('userAuth', userAuth)
    if (!userAuth.user && userAuth.error.name === 'IncorrectPasswordError') {
        req.flash('error', '비밀번호가 일치하지 않습니다.')
        console.log('inside of if statement')
        console.log('userAuth.error.name', userAuth.error.name)
        res.redirect('/changeNickname')
    } else if(userAuth.user) {
        console.log('it is the right password')
        const changedNickname = await User.findByIdAndUpdate(res.locals.currentUser._id, {nickname})
        console.log(changedNickname);
        req.flash('success', '별명 변경이 완료되었습니다.')
        res.redirect('/personal')
    }
}

module.exports.renderUserTests = async (req, res) => {
    const tests = []
    console.log('res.locals.currentUser.tests: ', res.locals.currentUser.tests)
    for (test of res.locals.currentUser.tests) {
        const t = await Test.findById(test);
        if(t) {
            tests.push(t);
        }
    }
    res.render('users/usertests', {tests})    
}

module.exports.showTest = async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('users/showTest', {test})
}