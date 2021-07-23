const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {isAuthorized} = require('../middleware')
const testsController = require('../controllers/tests')


router.get('/new', testsController.renderNew)


router.route(`/created`)
    .get(catchAsync(testsController.renderCreated))
    .post(catchAsync(testsController.createTest))

router.get('/:id/start', catchAsync(testsController.startTest))

router.get('/:id/conduct', catchAsync(testsController.conductTest))

router.get('/:id/conduct/axios', catchAsync(testsController.conductAxios))

router.route('/:id/result')
    .get(catchAsync(testsController.renderTestResult))
    .post(catchAsync(testsController.cookieTestResult))


router.route('/:id/edit/titleDescription')
    .get(isAuthorized, catchAsync(testsController.renderEditTitleDescription))
    .patch(isAuthorized, catchAsync(testsController.editTitleDescription))


router.route('/:id/edit/criteria')
    .get(isAuthorized, catchAsync(testsController.renderEditCriteria))
    .patch(isAuthorized, catchAsync(testsController.editCriteria))


router.route('/:id/edit/questions')
    .get(isAuthorized, catchAsync(testsController.renderEditQuestions))
    .patch(isAuthorized, catchAsync(testsController.editQuestions))


router.route('/:id/edit/results')
    .get(isAuthorized, catchAsync(testsController.renderEditResult))
    .patch(isAuthorized, catchAsync(testsController.editResult))

router.delete('/:id/delete', isAuthorized, catchAsync(testsController.deleteTest))

module.exports = router;