const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../models/user');


router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', async (req, res) => {
    const {username, nickname, password} = req.body;
    const user = new User({username, nickname})
    const newUser = await User.register(user, password);
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', async (req, res) => {

})

module.exports = router;