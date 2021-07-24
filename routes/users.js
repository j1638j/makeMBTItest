const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');
const usersController = require('../controllers/users')

const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthorized} = require('../middleware')


router.route('/register')
    .get(usersController.renderRegister)
    .post(catchAsync(usersController.registerUser))

router.post('/uniqueEmail', catchAsync(usersController.checkUniqueEmail))


router.route('/login')
    .get(usersController.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
    usersController.login)


router.get('/logout', usersController.logout)


router.get('/personal', isLoggedIn, usersController.renderPersonal)

router.route('/changePassword')
    .get(isLoggedIn , usersController.renderChangePassword)
    .post(isLoggedIn, catchAsync(usersController.changePassword))

router.route('/changeNickname')
    .get(isLoggedIn, usersController.renderChangeNickname)
    .post(isLoggedIn, catchAsync(usersController.changeNickname))

router.get('/usertests', isLoggedIn, catchAsync(usersController.renderUserTests))

router.get('/showTest/:id', isAuthorized, catchAsync(usersController.showTest))

module.exports = router;