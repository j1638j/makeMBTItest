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


app.get('/tests/new', async (req, res) => {
    res.render('tests/new');
})


app.get(`/tests/created`, async (req, res) => {
    const { testId } = req.signedCookies;
    res.render('tests/created', testId);
})

app.post('/tests/created', async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const test = new Test(req.body);
    const testId = test._id;
    //pass the id to the cookie
    res.cookie('testId', { testId }, { signed: true });
    await test.save();
    res.redirect('/tests/created')
})

app.get('/tests/:id/start', async (req, res) => {
    const test = await Test.findById(req.params.id).exec();
    console.dir(test);
    if (test === null) {
        res.render('tests/noTest');
    } else {
        res.render('tests/start', { test })
    }
})

app.get('/tests/:id/conduct', async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/conduct', { test })
})

app.get('/tests/:id/conduct/axios', async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
})

app.get('/tests/:id/result', async (req, res) => {
    res.render('result');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})