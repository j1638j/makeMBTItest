const express = require('express');
const router = express.Router();

app.get('/register', async (req, res) => {
    res.render('users/register')
})

app.get('/login', async (req, res) => {
    res.render('users/login')
})


module.exports = router;