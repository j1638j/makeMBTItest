//express
const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');

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
app.use(express.static('public'));
app.use(express.static('styles'));


app.use(express.json())
app.use(cookieParser('secret'));

//urlencoded : a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
//parse req.body 
app.use(express.urlencoded({ extended: true }))

//models
const Test = require('./models/test');



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

app.post('/makeTest', async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const test = new Test(req.body);
    const testId = test._id;
    res.cookie('testId', { testId }, { signed: true });
    // await test.save();
    //pass the id to the url or use COOKIE OR SESSION******
    res.redirect('/makeTestFinished')
})


app.get(`/makeTestFinished`, async (req, res) => {
    const { testId } = req.signedCookies;
    res.render('makeTestFinished', testId);
})

// app.get('/question', async (req, res) => {
//     res.render('question')
// })

// app.get('/result', async (req, res) => {
//     res.render('result')
// })

app.get('/:id', async (req, res) => {
    res.render('');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})