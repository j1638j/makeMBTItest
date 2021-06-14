const express = require('express');
const router = express.Router();
const Test = require('../models/test');


router.get('/new', async (req, res) => {
    res.render('tests/new');
})


router.get(`/created`, async (req, res) => {
    const { testId } = req.signedCookies;
    res.render('tests/created', testId);
})

router.post('/created', async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const test = new Test(req.body);
    const testId = test._id;
    //pass the id to the cookie
    res.cookie('testId', { testId }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    await test.save();
    console.log('test in the ', await Test.findById(testId));
    res.redirect('/tests/created')
})

router.get('/:id/start', async (req, res) => {
    const test = await Test.findById(req.params.id).exec();
    console.dir(test);
    if (test === null) {
        res.render('tests/noTest');
    } else {
        res.render('tests/start', { test })
    }
})

router.get('/:id/conduct', async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/conduct', { test })
})

router.get('/:id/conduct/axios', async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
})

router.get('/:id/result', async (req, res) => {
    const result = JSON.parse(req.signedCookies.result.result);
    res.render('tests/result', { result });
})

router.post('/:id/result', async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const result = JSON.stringify(req.body);
    console.log('stringified result: ', result)
    res.cookie('result', { result }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    res.redirect('/tests/:id/result')
})


module.exports = router;