const tabs = document.querySelectorAll('.tab');
const steps = document.querySelectorAll('.step');
const beforeButton = document.querySelector('#before-button');
const nextButton = document.querySelector('#next-button');
const finishButton = document.querySelector('#finish-button');
let currentTab = 0;


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


displayTab(currentTab);
buttonSetting(currentTab);
stepSetting(currentTab);








