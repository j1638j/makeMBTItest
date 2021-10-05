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
                console.log('test at first: ', test)
                testId = test._id;
                return test;
            }).then(function (test) {
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

    if (questionCount < questionsArrayLength) {
        showQuestion(test, questionCount);
        console.log('still middle of the test')
    } else {
        //테스트 끝나고 결과 산출
        const result = calculateResult();
        console.log('test finished')
        console.log('result: ', result)
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

    //criteriaMap 돌면서 결과가 어떤 타입으로 나오는지 보고 resultTypeArray에 추가
    for (let [key, value] of criteriaMap) {
        const criterion = test.criteria.find(el => el.name === key)

        console.log('criterion: ', criterion)
        console.log('key, value: ', key, ', ', value)
        const getCriterionResult = function (c) {
            if (value < c.standardScore) {
                console.log('below: ', c.belowStandardIs);
                return c.belowStandardIs
            } else {
                console.log('above: ', c.standardAndAboveIs);
                return c.standardAndAboveIs
            }
        }

        const criterionResult = getCriterionResult(criterion);
        testResultArray.push(criterionResult)
        console.log('criterionResult: ', criterionResult)
        console.log('testResultArray: ', testResultArray)
    }

    //find the test.results.resultType that contains all the elements from resultTypeArray
    console.log('test: ', test)
    console.log('test.results', test.results)
    const testResult = test.results.find(function (el) {
        const checkTestResultArray = testResultArray.every(function (element) {
            console.log('el.resultType: ', el.resultType)
            console.log(`element: `, element)
            console.log(el.resultType.includes(element))
            return el.resultType.includes(element)
        })
        return checkTestResultArray === true
    })
    console.log('testResult: ', testResult)

    return testResult
}

const goToNextPage = function (result) {
    console.log('inside of goToNextPage()')
    const url = `/tests/${testId}/result`
    console.log('type of testId: ', typeof testId)
    console.log('url is: ', url)
    axios(url, {
        method: 'post',
        data: { result, testId }
    }).then(function (res) {
        console.log('res.data is: ' + res.data);
        return window.location = url
    }).catch(e => { console.log(e) })
}


//start the test with the first question 
callAxios(currentURL)
    .then(function (res) {
        criteriaMap = mapCriteria(test.criteria);
        selectQuestion(test);
    }).catch(e => console.log(e));


optionButton1.addEventListener('click', function () {
    keepTheScores(0)
    questionCount++
    selectQuestion(test)
})

optionButton2.addEventListener('click', function () {
    keepTheScores(1)
    questionCount++
    selectQuestion(test)
})