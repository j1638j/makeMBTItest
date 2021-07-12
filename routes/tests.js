const express = require('express');
const { findOneAndUpdate, findByIdAndUpdate } = require('../models/test');
const router = express.Router({mergeParams: true});
const Test = require('../models/test');
const User = require('../models/user');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');



router.get('/new', (req, res) => {
    res.render('tests/new');
})


router.get(`/created`, catchAsync(async (req, res) => {
    const { testId } = req.signedCookies;
    delete req.signedCookies.testId;
    res.render('tests/created', testId);
}))

router.post('/created', catchAsync(async (req, res) => {
    const test = new Test(req.body);
    const testId = test._id;
    const currentUser = res.locals.currentUser;
    console.log('currentUser: ', currentUser)
    if(currentUser) {
        test.author = currentUser._id;
        console.log('test.author: ', test.author)
        const newTests = currentUser.tests.push(testId);
        console.log('testId: ', testId)
        console.log('currentUser.tests: ', currentUser.tests);
        console.log('newTests: ', newTests)
        const updatedUser = await User.findByIdAndUpdate(currentUser._id, {tests: currentUser.tests});
        console.log('updatedUser', updatedUser);
    }
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

router.get('/:id/edit/titleDescription', catchAsync(async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/editTitleDescription', {test})
}))

router.patch('/:id/edit/titleDescription', catchAsync(async(req, res) => {
    const { id } = req.params;
    const test = await Test.findByIdAndUpdate(id, {...req.body.test})
    res.redirect(`/showTest/${test._id}`)
}))


router.get('/:id/edit/criteria', catchAsync(async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/editCriteria', {test})
}))

router.get('/:id/edit/questions', (req, res) => {
    res.render('tests/editQuestions')
})

router.get('/:id/edit/results', (req, res) => {
    res.render('tests/editResults');
})

module.exports = router;