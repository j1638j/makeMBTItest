if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//mongoose
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost/mbtitest';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('mongoose connected')
    }).catch(err => {
        console.log('mongoose connection failed')
    })

//session
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret: process.env.SECRET,
    touchAfter: 24 * 3600
})

store.on("error", e => console.log("Session store error: ", e))

const sessionConfig = {
    store,
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))


//ejs
const ejsMate = require('ejs-mate')
const path = require('path');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//statics
app.use(express.static('public'));

app.use(express.json())
app.use(cookieParser(process.env.SECRET));

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
    console.log('test in the ', await Test.findById(testId));
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
    const result = JSON.parse(req.signedCookies.result.result);
    res.render('tests/result', { result });
})

app.post('/tests/:id/result', async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const result = JSON.stringify(req.body);
    console.log('stringified result: ', result)
    res.cookie('result', { result }, { signed: true });
    res.redirect('/tests/:id/result')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})