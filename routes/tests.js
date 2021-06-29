const express = require('express');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/test');
const router = express.Router({mergeParams: true});
const Test = require('../models/test');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');



router.get('/new', (req, res) => {
    res.render('tests/new');
})


router.get(`/created`, catchAsync(async (req, res) => {
    const { testId } = req.signedCookies;
    const currentUser = res.locals.currentUser;
    if(res.locals.currentUser) {
        const user = await findById(currentUser._id);
        const newTests = user.tests.push(testId);
        const updatedUser = await findByIdAndUpdate(currentUser._id, {tests: newTests});
        console.log(updatedUser);
    }
    delete req.signedCookies.testId;
    res.render('tests/created', testId);
}))

router.post('/created', catchAsync(async (req, res) => {
    // if(!req.body) throw new ExpressError('Invalid Test Data', 400);
    const test = new Test(req.body);
    const testId = test._id;
    //pass the id to the cookie
    res.cookie('testId', { testId }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    await test.save();
    console.log('test in the ', await Test.findById(testId));
    res.redirect('/tests/created')
}))

router.get('/:id/start', catchAsync(async (req, res) => {
    const test = await Test.findById(req.params.id).exec();
    if (test === null) {
        res.render('tests/noTest');
    } else {
        res.render('tests/start', { test })
    }
}))

router.get('/:id/conduct', catchAsync(async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/conduct', { test })
}))

router.get('/:id/conduct/axios', catchAsync(async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
}))

router.get('/:id/result', catchAsync(async (req, res) => {
    const result = JSON.parse(req.signedCookies.result.result);
    res.render('tests/result', { result });
}))

router.post('/:id/result', catchAsync(async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const result = JSON.stringify(req.body);
    console.log('stringified result: ', result)
    res.cookie('result', { result }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    res.redirect('/tests/:id/result')
}))


module.exports = router;