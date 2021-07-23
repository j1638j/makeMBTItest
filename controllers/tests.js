const Test = require('../models/test');
const User = require('../models/user');


module.exports.renderNew = (req, res) => {
    res.render('tests/new');
}

module.exports.renderCreated = async (req, res) => {
    const { testId } = req.signedCookies;
    delete req.signedCookies.testId;
    res.render('tests/created', testId);
}

module.exports.createTest = async (req, res) => {
    const test = new Test(req.body);
    const testId = test._id;
    const currentUser = res.locals.currentUser;
    if(currentUser) {
        test.author = currentUser._id;
        currentUser.tests.push(testId);
        const updatedUser = await User.findByIdAndUpdate(currentUser._id, {tests: currentUser.tests});
    }
    //pass the id to the cookie
    res.cookie('testId', { testId }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    await test.save();
    console.log('test in the ', await Test.findById(testId));
    res.redirect('/tests/created')
}


module.exports.startTest = async (req, res) => {
    const test = await Test.findById(req.params.id).exec();
    if (test === null) {
        res.render('tests/noTest');
    } else {
        res.render('tests/start', { test })
    }
}

module.exports.conductTest = async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/conduct', { test })
}

module.exports.conductAxios = async (req, res) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
}

module.exports.renderTestResult = async (req, res) => {
    const result = JSON.parse(req.signedCookies.result.result);
    res.render('tests/result', { result });
}

module.exports.cookieTestResult = async (req, res) => {
    console.log('req.body is: ');
    console.dir(req.body);
    const result = JSON.stringify(req.body);
    console.log('stringified result: ', result)
    res.cookie('result', { result }, { signed: true, maxAge: 1000 * 60 * 60 * 24 });
    res.redirect('/tests/:id/result')
}

module.exports.renderEditTitleDescription = async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/editTitleDescription', {test})
}

module.exports.editTitleDescription = async(req, res) => {
    const { id } = req.params;
    const test = await Test.findByIdAndUpdate(id, {...req.body.test})
    res.redirect(`/showTest/${test._id}`)
}

module.exports.renderEditCriteria = async(req, res) => {
    const test = await Test.findById(req.params.id);
    res.render('tests/editCriteria', {test})
}

module.exports.editCriteria = async(req, res) => {
    const criteria = req.body;
    const test = await Test.findByIdAndUpdate(req.params.id, {criteria}, {new: true});
    console.log('test: ', test);
    res.send('finished');
}

module.exports.renderEditQuestions = async(req, res) => {
    const test = await Test.findById(req.params.id)
    res.render('tests/editQuestions', {test})
}

module.exports.editQuestions = async(req, res) => {
    const questions = req.body;
    const test = await Test.findByIdAndUpdate(req.params.id, {questions}, {new: true});
    console.log('test: ', test);
    res.send('finished')
}

module.exports.renderEditResult = async (req, res) => {
    const test = await Test.findById(req.params.id)
    res.render('tests/editResults', {test});
}

module.exports.editResult = async(req, res)=> {
    const results = req.body;
    const test = await Test.findByIdAndUpdate(req.params.id, {results}, {new: true});
    console.log('test: ', test);
    res.send('finished')
}

module.exports.deleteTest = async(req, res) => {
    const test = await Test.findById(req.params.id)
    const currentUser = res.locals.currentUser
    for (let i = 0; i < currentUser.tests.length; i++) {
        if(currentUser.tests[i]._id.equals(test._id)) {
            console.log('found it!')
            currentUser.tests.splice(i, 1)
            const user = await User.findByIdAndUpdate(currentUser._id, {tests: currentUser.tests}, {new: true})
        }
    }
    const deletedTest = await Test.findByIdAndDelete(req.params.id)
    res.send('deleted?')
}