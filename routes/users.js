const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/register', async (req, res) => {
    res.render('users/register')
})

router.get('/login', async (req, res) => {
    res.render('users/login')
})


module.exports = router;