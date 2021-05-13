//DOM
//overall
const tabs = document.querySelectorAll('.tab');
const steps = document.querySelectorAll('.step');
const beforeButton = document.querySelector('#before-button');
const nextButton = document.querySelector('#next-button');
const finishButton = document.querySelector('#finish-button');
//criteria
const addCriteriaButton = document.querySelector('#add-criteria-button');
const criteriaPreference = document.querySelector('#criteria-preference');
const criteriaStandardScore = document.querySelector('#criteria-standard-score')
const criteriaBelowStandardIs = document.querySelector('#criteria-below-standard-is')
const criteriaStandardAndAboveIs = document.querySelector('#criteria-standard-and-above-is')
const finishedCriteriaDiv = document.querySelector('#finished-criteria-div');
// const finishedCriteriaCard = document.querySelector('#finished-criteria-card');


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
    currentTab++;
    displayTab(currentTab);
    buttonSetting(currentTab);
    stepSetting(currentTab);
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
            `<div id="finished-criteria-card" class="card border-2 my-2">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">기준점수 ${standardScore}점</h6>
                        <p class="card-text">기준점수 미만 ${belowStandardIs}, 이상 ${standardAndAboveIs}</p>
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
    }
})




displayTab(currentTab);
buttonSetting(currentTab);
stepSetting(currentTab);








