if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');


//mongoose
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost/mbtitest';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('mongoose connected')
    }).catch(err => {
        console.log('mongoose connection failed')
    })


//Models
const User = require('./models/user');

//Custom Error Handlers
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

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


//passport
const passport = require('passport');
const localStrategy = require('passport-local');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());


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





//routers
const testRoutes = require('./routes/tests');
app.use('/tests', testRoutes);

const userRoutes = require('./routes/users');
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/error', (req, res) => {
    Jiwan.isAwesome();
})


//404
app.all('*', (req, res, next) => {
    res.status(404).render('404');
})

//error
app.use((err, req, res, next) => {
    console.log('ERROR happened from: ', req.route)
    console.error(err);
    const { statusCode = 500 } = err;
    res.status(statusCode).render('error', {err})
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})