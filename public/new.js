//DOM

//overall
const tabs = document.querySelectorAll('.tab');
const steps = document.querySelectorAll('.step');
const beforeButton = document.querySelector('#before-button');
const nextButton = document.querySelector('#next-button');
const finishButton = document.querySelector('#finish-button');
//test name
const testNameInput = document.querySelector('#test-name-input');
const testDescriptionInput = document.querySelector('#test-description-input');
//criteria
const addCriteriaButton = document.querySelector('#add-criteria-button');
const criteriaPreference = document.querySelector('#criteria-preference');
const criteriaStandardScore = document.querySelector('#criteria-standard-score')
const criteriaBelowStandardIs = document.querySelector('#criteria-below-standard-is')
const criteriaStandardAndAboveIs = document.querySelector('#criteria-standard-and-above-is')
const finishedCriteriaDiv = document.querySelector('#finished-criteria-div');
//question&option
const optionCriterionSelect = document.querySelector('#option-criterion-select');
const questionDOM = document.querySelector('#question');
const optionTextDOM1 = document.querySelector('#option1');
const optionTextDOM2 = document.querySelector('#option2');
const optionScoreDOM1 = document.querySelector('#option-score-1');
const optionScoreDOM2 = document.querySelector('#option-score-2');
const addQuestionButton = document.querySelector('#add-question-button');
const finishedQuestionDiv = document.querySelector('#finished-question-div');
//result
const resultTypeDiv = document.querySelector('#result-type-div');
const addResultButton = document.querySelector('#add-result-button');
const finishedResultDiv = document.querySelector('#finished-result-div')


let currentTab = 0;
const criteriaArray = [];
const optionsArray = [];
const questionsArray = [];
const resultsArray = [];

//OVERALL
const displayTab = function (currentTab) {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    tabs[currentTab].style.display = 'block';
}

const stepSetting = function (currentTab) {
    steps[currentTab].className = 'step active';

    for (let i = 0; i < tabs.length; i++) {
        if (i < currentTab) {
            steps[i].className = 'step finish';
        } else if (i > currentTab) {
            steps[i].className = 'step';
        }
    }
}

const buttonSetting = function (currentTab) {
    if (currentTab === 0) { //????????? ???
        beforeButton.setAttribute("disabled", "");
        nextButton.style.display = 'block'
        finishButton.style.display = 'none';
    } else if (currentTab === tabs.length - 1) { //????????? ???
        beforeButton.removeAttribute('disabled');
        nextButton.style.display = 'none';
        finishButton.style.display = 'block';
    } else { //?????????
        beforeButton.removeAttribute('disabled');
        nextButton.style.display = 'block';
        finishButton.style.display = 'none';
    }
}

beforeButton.addEventListener('click', function () {
    currentTab--;
    displayTab(currentTab);
    buttonSetting(currentTab);
    stepSetting(currentTab);
})

nextButton.addEventListener('click', function () {
    const cArray = criteriaArray.filter(el => el)
    const qArray = questionsArray.filter(el => el)

    if (currentTab === 2 && qArray.length < cArray.length) {
        //?????? ????????? ?????? ???????????? ????????? ???
        alert('??????????????? ????????? ????????? ?????? ??? ????????? ?????????. ????????? ??? ????????? ?????????.');

    } else {
        currentTab++;
        displayTab(currentTab);
        buttonSetting(currentTab);
        stepSetting(currentTab);
    }
})

finishButton.addEventListener('click', function (e) {
    e.preventDefault();
    //make JSON with test object

    const cArray = criteriaArray.filter(el => el)
    const qArray = questionsArray.filter(el => el)
    const rArray = resultsArray.filter(el => el)


    const test = {
        title: testNameInput.value,
        description: testDescriptionInput.value,
        questions: questionsArray.filter(el => el),
        criteria: criteriaArray.filter(el => el),
        results: resultsArray.filter(el => el)
    }
    console.log('console.log(test) is: ' + test);
    console.log('console.dir(test) is: ');
    console.dir(test);

    if (!qArray.length || !cArray.length || !rArray.length) {
        alert('???????????? ???????????? ?????? ????????? ????????????. ???????????? ????????? ??????????????????.')
    } else if (currentTab === 3 && rArray.length !== 2 ** (cArray.length)) {
        //?????? ????????? 2^(??????????????? ???) ?????? ???
        alert('????????? ?????? 2^(?????? ????????? ???) ?????? ?????????. ????????? ??????????????????.')
    } else {
        //If everything goes well, send all the data thru axios.
        axios('/tests/created', {
            method: 'post',
            data: test,
        }).then(function (res) {
            console.log('res.data is: ' + res.data);
            console.log('res.config is: ' + JSON.stringify(res.config));
            console.log('res.request is: ' + res.request);
            return window.location = `/tests/created`
        }).catch(e => { console.log(e) })
    }


})





//Criteria (Second Question)
addCriteriaButton.addEventListener('click', function () {
    const name = criteriaPreference.value;
    const standardScore = criteriaStandardScore.value;
    const belowStandardIs = criteriaBelowStandardIs.value;
    const standardAndAboveIs = criteriaStandardAndAboveIs.value;
    const criteriaEmptyInputAlert = document.querySelector('#criteria-empty-input-alert');
    const criteriaSameInputAlert = document.querySelector('#criteria-same-input-alert');
    const numberOfCriteria = document.querySelectorAll('.finished-criteria-card').length;


    if (!name || !standardScore || !belowStandardIs || !standardAndAboveIs) {
        //Check if all the inputs are filled
        criteriaEmptyInputAlert.style.display = 'block';
    } else if (belowStandardIs === standardAndAboveIs) {
        //Check if inputs are different
        criteriaEmptyInputAlert.style.display = 'none';
        criteriaSameInputAlert.style.display = 'block';
    } else {
        //IF ALL IS WELL,
        //add criteria to the array
        criteriaArray.push({ name, standardScore, belowStandardIs, standardAndAboveIs })
        console.log('criteriaArray: ', criteriaArray)
        //show criteria in card
        const newFinishedCriteriaCard = document.createElement('div');
        newFinishedCriteriaCard.classList.add('card', 'border-2', 'my-2', 'finished-criteria-card')
        newFinishedCriteriaCard.setAttribute('id', 'finished-criteria-card-' + numberOfCriteria)
        const newFinishedCriteriaCardBody = document.createElement('div');
        newFinishedCriteriaCardBody.classList.add('card-body', 'd-flex', 'justify-content-between')
        const textDiv = document.createElement('div')
        const titleH5 = document.createElement('h5');
        titleH5.classList.add('card-title')
        titleH5.innerText = name
        const scoreP = document.createElement('p');
        scoreP.innerText = `???????????? ${standardScore}??? ?????? ${belowStandardIs}, ?????? ${standardAndAboveIs}`
        scoreP.classList.add('card-text')
        const closeButton = document.createElement('button')
        closeButton.classList.add('btn-close', 'criteria-close-button')
        closeButton.setAttribute('id', 'finished-criteria-card-close-button-' + numberOfCriteria)
        closeButton.setAttribute('type', 'button')
        closeButton.setAttribute('aria-label', 'Close')
        closeButton.setAttribute('style', 'display:block')
        closeButton.onclick = function () {
            newFinishedCriteriaCard.remove();
            delete criteriaArray[numberOfCriteria]
            newSelectOption.remove()
            criterionSelect.remove()
            console.log('criteriaArray: ', criteriaArray)
            console.log('filtered: ', criteriaArray.filter(el => el))
        }
        finishedCriteriaDiv.append(newFinishedCriteriaCard);
        newFinishedCriteriaCard.append(newFinishedCriteriaCardBody)
        newFinishedCriteriaCardBody.append(textDiv, closeButton)
        textDiv.append(titleH5, scoreP)

        //clear inputs
        criteriaPreference.value = criteriaStandardScore.value = criteriaBelowStandardIs.value = criteriaStandardAndAboveIs.value = '';
        //dismiss alerts if exist
        criteriaEmptyInputAlert.style.display = 'none';
        criteriaSameInputAlert.style.display = 'none';
        //add option criterion select
        const newSelectOption = document.createElement('option')
        newSelectOption.setAttribute('value', name)
        newSelectOption.innerText = name;
        optionCriterionSelect.append(newSelectOption)

        //currentTab === 3
        // ??? ?????? ????????? ?????? ???????????? ?????? ??????, ?????? ?????? ??????
        let length = criteriaArray.length;

        const criterionSelect = document.createElement('select');
        criterionSelect.setAttribute('id', `result-criterion-select-${length}`)
        criterionSelect.setAttribute('class', 'form-select result-criterion-select');

        const criterionOptionSelected = document.createElement('option');
        criterionOptionSelected.setAttribute('id', 'option-ignored')
        criterionOptionSelected.setAttribute('value', '');
        criterionOptionSelected.setAttribute('selected', '');
        criterionOptionSelected.innerText = `${criteriaArray[length - 1].name}`;

        const criterionOption1 = document.createElement('option');
        criterionOption1.setAttribute('value', `${criteriaArray[length - 1].belowStandardIs}`);
        criterionOption1.innerText = `${criteriaArray[length - 1].belowStandardIs}`

        const criterionOption2 = document.createElement('option');
        criterionOption2.setAttribute('value', `${criteriaArray[length - 1].standardAndAboveIs}`);
        criterionOption2.innerText = `${criteriaArray[length - 1].standardAndAboveIs}`;

        criterionSelect.append(criterionOptionSelected, criterionOption1, criterionOption2);
        resultTypeDiv.append(criterionSelect);

    }
})



//Question & Option (Third Question)
addQuestionButton.addEventListener('click', function () {
    //form
    const question = {
        question: questionDOM.value,
        options: []
    }
    const option1 = {
        option: optionTextDOM1.value,
        criterion: optionCriterionSelect.value,
        score: optionScoreDOM1.value
    };
    const option2 = {
        option: optionTextDOM2.value,
        criterion: optionCriterionSelect.value,
        score: optionScoreDOM2.value
    };

    //alerts
    const questionEmptyInputAlert = document.querySelector('#question-empty-input-alert');
    const questionSameInputAlert = document.querySelector('#question-same-input-alert');

    const numberOfQuestions = document.querySelectorAll('.finished-questions-div').length;

    if (!question || !option1.option || !option1.criterion || !option1.score || !option2.option || !option2.criterion || !option2.score) {
        //check if all the inputs are filled out
        questionEmptyInputAlert.style.display = 'block';
    } else if (option1.option === option2.option || option1.score === option2.score) {
        //check if inputs are different
        questionEmptyInputAlert.style.display = 'none';
        questionSameInputAlert.style.display = 'block';
    } else {
        //add options to array
        optionsArray.push(option1, option2);
        //add question to array
        question.options = optionsArray;
        questionsArray.push(question);
        console.log('questionsArray: ', questionsArray)

        //show question in card
        const newFinishedQuestionCard = document.createElement('div');
        newFinishedQuestionCard.classList.add('card', 'border-2', 'my-2', 'finished-questions-div')
        const newFinishedQuestionCardBody = document.createElement('div');
        newFinishedQuestionCardBody.classList.add('card-body', 'd-flex', 'justify-content-between')
        const textDiv = document.createElement('div');
        const titleH5 = document.createElement('h5');
        titleH5.classList.add('card-title', 'mb-4');
        titleH5.innerText = `??????: ${question.question}`
        const option1p = document.createElement('p');
        option1p.classList.add('card-text', 'mb-2');
        option1p.innerText = `?????????1: ${option1.option} (${option1.criterion} ${option1.score} ??????)`
        const option2p = document.createElement('p');
        option2p.classList.add('card-text');
        option2p.innerText = `?????????2: ${option2.option} (${option2.criterion} ${option2.score} ??????)`
        const closeButton = document.createElement('button');
        closeButton.classList.add('btn-close', 'question-close-button')
        closeButton.setAttribute('id', `finished-question-card-close-button-${numberOfQuestions}`)
        closeButton.setAttribute('type', `button`)
        closeButton.setAttribute('aria-label', `Close`)
        closeButton.setAttribute('style', `display:block`)
        closeButton.onclick = function () {
            newFinishedQuestionCard.remove();
            delete questionsArray[numberOfQuestions]
            console.log('questionsArray: ', questionsArray)
            console.log('filtered questionsArray: ', questionsArray.filter(el => el))
        }
        finishedQuestionDiv.append(newFinishedQuestionCard);
        newFinishedQuestionCard.append(newFinishedQuestionCardBody);
        newFinishedQuestionCardBody.append(textDiv, closeButton);
        textDiv.append(titleH5, option1p, option2p)

        //clear inputs
        questionDOM.value = optionScoreDOM1.value = optionScoreDOM2.value = optionCriterionSelect.value = optionTextDOM1.value = optionTextDOM2.value = "";
        //dismiss alerts if exist
        questionEmptyInputAlert.style.display = 'none';
        questionSameInputAlert.style.display = 'none';
    }



})


//Result (Fourth Question)
addResultButton.addEventListener('click', function () {
    //save result type
    const resultTypeDOM = document.querySelectorAll('.result-criterion-select');
    const resultTypeArray = [];
    for (let i = 0; i < resultTypeDOM.length; i++) {
        if (resultTypeDOM[i].value) {
            resultTypeArray.push(resultTypeDOM[i].value);
        }
        console.log(resultTypeArray)
    }

    //check if there is any empty result type select
    const isAnyResultTypeEmpty = function () {
        if (resultTypeArray.every(item => item !== "")) {
            return false
        } else {
            return true
        }
    }

    const assignPossibleValue = function (element) {
        let elementValue = '';
        try {
            elementValue = element.value
            return elementValue;
        } catch (e) {
            console.error(e);
            return elementValue;
        }
    }
    const perfectMatchResultName = assignPossibleValue(document.querySelector('#result-perfect-match-name'));
    const perfectMatchDescription = assignPossibleValue(document.querySelector('#result-perfect-match-description'));
    const worstMatchResultName = assignPossibleValue(document.querySelector('#result-worst-match-name'));
    const worstMatchDescription = assignPossibleValue(document.querySelector('#result-worst-match-description'));

    //save result
    const result = {
        resultType: resultTypeArray,
        resultName: document.querySelector('#result-name-input').value,
        description: document.querySelector('#result-description-textarea').value,
        perfectMatch: {
            resultName: perfectMatchResultName,
            description: perfectMatchDescription
        },
        worstMatch: {
            resultName: worstMatchResultName,
            description: worstMatchDescription
        }
    }


    //alerts
    const resultEmptyInputAlert = document.querySelector('#result-empty-input-alert');
    const resultSameInputAlert = document.querySelector('#result-same-input-alert')

    const numberOfResults = document.querySelectorAll('.finished-result-div').length;

    if (isAnyResultTypeEmpty() || !result.resultName || !result.description) {
        //check if all the inputs are filled out
        resultEmptyInputAlert.style.display = 'block'
    } else if (result.perfectMatch.resultName !== "" && result.perfectMatch.resultName === result.worstMatch.resultName) {
        //check if match.resultNames are different
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '????????? ????????? ????????? ????????? ?????? ?????? ??? ????????????.'
        resultSameInputAlert.style.display = 'block'
    } else if (result.perfectMatch.description !== "" && result.perfectMatch.description === result.worstMatch.description) {
        //check if match.descriptions are different
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '????????? ????????? ????????? ????????? ?????? ?????? ??? ????????????.'
        resultSameInputAlert.style.display = 'block'
    } else if (resultsArray.find(el => { return el === result.resultName })) {
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '?????? ????????? ????????? ?????? ??? ?????? ??? ????????????.'
        resultSameInputAlert.style.display = 'block'
    } else {
        //add result to array
        resultsArray.push(result);
        console.log('resultsArray: ', resultsArray)
        //show result in card
        const newFinishedResultCard = document.createElement('div');
        newFinishedResultCard.classList.add('card', 'border-2', 'my-2', 'finishied-result-div')
        const newFinishedResultCardBody = document.createElement('div')
        newFinishedResultCardBody.classList.add('card-body', 'd-flex', 'justify-content-between')
        const textDiv = document.createElement('div');
        const resultNameH5 = document.createElement('h5');
        resultNameH5.classList.add('card-title', 'mb-4')
        resultNameH5.innerText = `${result.resultName}`
        const resultTypeP = document.createElement('p')
        resultTypeP.classList.add('card-text', 'mb-2')
        resultTypeP.innerText = `??????: ${resultTypeArray.toString()}`
        const descriptionP = document.createElement('p')
        descriptionP.classList.add('card-text', 'mb-2')
        descriptionP.innerText = `??????: ${result.description}`
        const perfectMatchP = document.createElement('p')
        perfectMatchP.classList.add('card-text', 'mb-2')
        perfectMatchP.innerText = `????????? ??????: ${result.perfectMatch.resultName} - ${result.perfectMatch.description}`
        const worstMatchP = document.createElement('p')
        worstMatchP.classList.add('card-text', 'mb-2')
        worstMatchP.innerText = `????????? ??????: ${result.worstMatch.resultName} - ${result.worstMatch.description}`
        const closeButton = document.createElement('button')
        closeButton.setAttribute('id', 'finished-result-card-close-button-' + numberOfResults)
        closeButton.setAttribute('type', 'button')
        closeButton.setAttribute('aria-label', 'Close')
        closeButton.setAttribute('style', 'display:block')
        closeButton.classList.add('btn-close', 'result-close-button')
        closeButton.onclick = function () {
            newFinishedResultCard.remove();
            delete resultsArray[numberOfResults]
            console.log('resultsArray: ', resultsArray)
            console.log('filtered resultsArray: ', resultsArray.filter(el => el))
        }

        finishedResultDiv.append(newFinishedResultCard);
        newFinishedResultCard.append(newFinishedResultCardBody)
        newFinishedResultCardBody.append(textDiv, closeButton)
        textDiv.append(resultNameH5, resultTypeP, descriptionP, perfectMatchP, worstMatchP)


        //clear inputs
        for (input of resultTypeDOM) {
            input.value = ''
        }
        document.querySelector('#result-name-input').value
            = document.querySelector('#result-description-textarea').value
            = document.querySelector('#result-perfect-match-name').value
            = document.querySelector('#result-perfect-match-description').value
            = document.querySelector('#result-worst-match-name').value
            = document.querySelector('#result-worst-match-description').value
            = "";

        //dismiss alerts if exist
        resultEmptyInputAlert.style.display = 'none';
        resultSameInputAlert.style.display = 'none';

    }


})





displayTab(currentTab);
buttonSetting(currentTab);
stepSetting(currentTab);








