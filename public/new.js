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
    if (currentTab === 0) { //첫번째 탭
        beforeButton.setAttribute("disabled", "");
        nextButton.style.display = 'block'
        finishButton.style.display = 'none';
    } else if (currentTab === tabs.length - 1) { //마지막 탭
        beforeButton.removeAttribute('disabled');
        nextButton.style.display = 'none';
        finishButton.style.display = 'block';
    } else { //나머지
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
    if (currentTab === 2 && questionsArray.length < criteriaArray.length) {
        //질문 숫자는 채점 기준보다 많아야 함
        alert('채점기준의 수보다 질문의 수가 더 많아야 합니다. 질문을 더 추가해 주세요.');

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
    const test = {
        title: testNameInput.value,
        description: testDescriptionInput.value,
        questions: questionsArray,
        criteria: criteriaArray,
        result: resultsArray
    }
    console.log('console.log(test) is: ' + test);
    console.log('console.dir(test) is: ');
    console.dir(test);

    // if (!questionsArray.length || !criteriaArray.length || !resultsArray.length) {
    //     alert('테스트에 완성되지 않은 부분이 있습니다. 테스트를 끝까지 완성해주세요.')
    // } else if (currentTab === 3 && resultsArray.length < 2 ** (criteriaArray.length)) {
    //     //결과 숫자는 2^(채점기준의 수) 여야 함
    //     alert('테스트 결과 수는 2^(채점기준의 수) 이상이어야 합니다. 테스트 결과를 추가해주세요.')
    // } else {
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
    // }


})





//Criteria (Second Question)
addCriteriaButton.addEventListener('click', function () {
    const name = criteriaPreference.value;
    const standardScore = criteriaStandardScore.value;
    const belowStandardIs = criteriaBelowStandardIs.value;
    const standardAndAboveIs = criteriaStandardAndAboveIs.value;
    const criteriaEmptyInputAlert = document.querySelector('#criteria-empty-input-alert');
    const criteriaSameInputAlert = document.querySelector('#criteria-same-input-alert');


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
        //show criteria in card
        const newFinishedCriteriaCard = document.createElement('div');
        newFinishedCriteriaCard.innerHTML =
            `<div id="finished-criteria-card-${criteriaArray.length - 1}" class="card border-2 my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">기준점수 ${standardScore}점 미만 ${belowStandardIs}, 이상 ${standardAndAboveIs}</p>
                    </div>
                    <button id="finished-criteria-card-close-button-${criteriaArray.length - 1}" type="button" class="btn-close"
                        aria-label="Close" style="display:none"></button>
                </div>
            </div>
        </div>`;
        finishedCriteriaDiv.append(newFinishedCriteriaCard);
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
        // 각 기준 점수에 대해 기준점수 이상 타입, 미만 타입 추가
        let length = criteriaArray.length;

        const criterionSelect = document.createElement('select');
        criterionSelect.setAttribute('id', `result-criterion-select-${length}`)
        criterionSelect.setAttribute('class', 'form-select result-criterion-select');

        const criterionOptionSelected = document.createElement('option');
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
        resultTypeDiv.append(/*criterionLabel,*/ criterionSelect);

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
        //show question in card
        const newFinishedQuestionCard = document.createElement('div');
        newFinishedQuestionCard.innerHTML =
            `<div id="finished-question-card" class="card border-2 my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title mb-4">질문: ${question.question}</h5>
                        <p class="card-text mb-2">선택지1: ${option1.option} (${option1.criterion} ${option1.score} 추가)</p>
                        <p class="card-text">선택지2: ${option2.option} (${option2.criterion} ${option2.score} 추가)</p>
                    </div>
                    <button id="finished-question-card-close-button-${criteriaArray.length - 1}" type="button" class="btn-close"
                        aria-label="Close" style="display:none"></button>
                </div>
            </div>
        </div>`;
        finishedQuestionDiv.append(newFinishedQuestionCard);

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
        resultTypeArray.push(resultTypeDOM[i].value);
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

    if (isAnyResultTypeEmpty() || !result.resultName || !result.description) {
        //check if all the inputs are filled out
        resultEmptyInputAlert.style.display = 'block'
    } else if (result.perfectMatch.resultName !== "" && result.perfectMatch.resultName === result.worstMatch.resultName) {
        //check if match.resultNames are different
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '최고의 궁합과 최악의 궁합의 값이 같을 수 없습니다.'
        resultSameInputAlert.style.display = 'block'
    } else if (result.perfectMatch.description !== "" && result.perfectMatch.description === result.worstMatch.description) {
        //check if match.descriptions are different
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '최고의 궁합과 최악의 궁합의 값이 같을 수 없습니다.'
        resultSameInputAlert.style.display = 'block'
    } else if (resultsArray.find(el => { return el === result.resultName })) {
        resultEmptyInputAlert.style.display = 'none'
        resultSameInputAlert.innerText = '같은 별명의 결과를 여러 개 만들 수 없습니다.'
        resultSameInputAlert.style.display = 'block'
    } else {
        //add result to array
        resultsArray.push(result);
        //show result in card
        const newFinishedResultCard = document.createElement('div');
        newFinishedResultCard.innerHTML =
            `<div id="finished-question-card" class="card border-2 my-2">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="card-title mb-4">${result.resultName}</h5>
                            <p class="card-text mb-2">타입: ${resultTypeArray.toString()}</p>
                            <p class="card-text mb-2">설명: ${result.description}</p>
                            <p class="card-text mb-2">최고의 궁합: ${result.perfectMatch.resultName} - ${result.perfectMatch.description}</p>
                            <p class="card-text mb-2">최악의 궁합: ${result.worstMatch.resultName} - ${result.worstMatch.description}</p>
                        </div>
                        <button id="finished-question-card-close-button-${criteriaArray.length - 1}" type="button" class="btn-close"
                            aria-label="Close" style="display:none"></button>
                    </div>
                </div>
            </div>`;
        finishedResultDiv.append(newFinishedResultCard);


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







