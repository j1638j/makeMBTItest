//DOM
const questionDOM = document.querySelector('#question-text');
const optionButton1 = document.querySelector('#option-button-1');
const optionButton2 = document.querySelector('#option-button-2');

//global variants
const currentURL = window.location.href;
let test = null;
let questionCount = 0;
let questionsArrayLength = 0;
let criteriaMap = null;
let testId = null;



//axios function
const callAxios = function (currentURL) {
    const url = currentURL + '/axios'
    const config = { headers: { Accept: 'application/json' } }
    const returnedPromise = new Promise((resolve, reject) => {
        axios.get(url, config)
            .then(function (res) {
                test = res.data;
                testId = test._id;
                return test;
            }).then(function () {
                resolve()
            }).catch(e => console.log(e))
    });;
    return returnedPromise;
}

//Assign to Arrays
/////1. I have to make a function that shows the question and options to the user
/////2. I have to make a function that calculates the score : need current option, criteria for the option
/////3. I have to make a function that shows the next question and options to the user. 
/////4. I have to make a function that Maps criteria Array, so that it stores all the criteria name and score.

const selectQuestion = function (test) {
    questionsArrayLength = test.questions.length;
    console.log(questionsArrayLength);

    if (questionCount < questionsArrayLength) {
        showQuestion(test, questionCount);
    } else {
        //테스트 끝나고 결과 산출
        const result = calculateResult();
        //결과 페이지로 넘어감
        goToNextPage(result);
    }
}

const showQuestion = function (test, index) {
    const questions = test.questions;
    questionDOM.innerText = questions[index].question;
    optionButton1.innerText = questions[index].options[0].option;
    optionButton2.innerText = questions[index].options[1].option;

}

const mapCriteria = function (originalArray) {
    //map
    const newMap = new Map();
    for (let el of originalArray) {
        //el.name을 key로 하고 점수를 value로 함. 기본 점수는 0
        newMap.set(el.name, 0)
    }
    return newMap;
}

const keepTheScores = function (optionIndex) {
    //현재 question은 전역변수 test와 questionCount에서 받아온다.
    //사용자가 선택한 option 번호를 arg로 받아서 그 option의 정보로 현재 criteriaMap의 점수를 가져와 추가 점수를 더함
    const currentOption = test.questions[questionCount].options[optionIndex]
    const criterionValue = criteriaMap.get(currentOption.criterion);
    criteriaMap.set(currentOption.criterion, criterionValue + currentOption.score)
}

const calculateResult = function () {
    //result of the test
    const testResultArray = [];

    //circulate criteriaMap and fill out resultTypeArray
    for (let [key, value] of criteriaMap) {
        const criterionResult = test.criteria.find(function (el) {
            if (el.name === key && value < el.starndardScore) {
                return el.belowStandardIs
            } else if (el.name === key) {
                return el.standardAndAboveIs
            } else {
                alret('테스트에 오류가 있습니다. 관리자에게 문의해주세요.')
            }
        })
        testResultArray.push(criterionResult)
    }

    //find the test.results.resultType that contains all the elements from resultTypeArray
    const testResult = test.results.find(function (el) {
        testResultArray.every(function (element) {
            el.resultType.include(element)
        })
    })

    return testResult
}

const goToNextPage = function (result) {
    const url = `/tests/${testId}/result`
    axios(url, {
        method: 'post',
        data: result
    }).then(function (res) {
        console.log('res.data is: ' + res.data);
        return window.location = url
    }).catch(e => { console.log(e) })
}



callAxios(currentURL)
    .then(function (test) {
        criteriaMap = mapCriteria(test.criteria);
        selectQuestion(test);
    }).catch(e => console.log(e));


optionButton1.addEventListener('click', function () {
    keepTheScores(0)
})

optionButton2.addEventListener('click', function () {
    keepTheScores(1)
})