//express
const express = require('express')
const app = express()
const port = 3000

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mbtitest', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
     console.log('mongoose connected')
}).catch(err => {
     console.log('mongoose connection failed')
}) 

//ejs
const ejsMate = require('ejs-mate')
const path = require('path');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));





app.get('/', (req, res) => {
  res.render('home');
})


app.get('/login', (req, res) => {
    res.render('users/login');
})

app.get('/signup', (req, res) => {
    res.render('users/signup');
})

app.get('/makeTest', (req, res) => {
    res.render('makeTest');
})

app.get('/myTests', (req, res) => {
    res.render('users/myTests')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})