//express
const express = require('express')
const app = express()
const port = 3000

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mbtitest', { useNewUrlParser: true, useUnifiedTopology: true })
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

//statics
app.use(express.static('doms'));
app.use(express.static('styles'));






app.get('/', (req, res) => {
    res.render('home');
})


// app.get('/login', (req, res) => {
//     res.render('users/login');
// })

// app.get('/signup', (req, res) => {
//     res.render('users/signup');
// })


app.get('/makeTest', async (req, res) => {
    res.render('makeTest');
})


app.get('/makeTestFinished', async (req, res) => {
    res.render('makeTestFinished');
})

app.get('/question', async (req, res) => {
    res.render('question')
})

app.get('/result', async (req, res) => {
    res.render('result')
})

app.get('/:id', async (req, res) => {
    res.render('');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})