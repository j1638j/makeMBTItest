const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res) => {
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
}))

router.post('/uniqueEmail', async (req, res) => {
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
})

router.get('/login', (req, res) => {
    res.render('users/login')
})


router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
    (req, res) => {
        req.flash('success', '환영합니다.');
        res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
})


module.exports = router;