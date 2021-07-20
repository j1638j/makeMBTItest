const editQuestionButton = document.querySelector('#edit-question-button')
const addQuestionButton = document.querySelector('#add-question-button')
let questionsDivs = document.querySelectorAll('.questions')
let deleteQuestionButtons = document.querySelectorAll('.delete-question-button');
let questions = []
let criteria = []


//모든 값이 입력되었는지 확인
const checkEmptyInput = function () {
    const allInputs = document.querySelectorAll('.form-control, .form-select');
    const booleanArray = []
    for (input of allInputs) {
        let text = input.value.trim();
        if (text) {
            booleanArray.push(true);
        } else {
            booleanArray.push(false)
        }
    }
    if (booleanArray.every(e => e)) {
        return true
    } else {
        return false
    }
}

//값을 입력해야 하는 곳에 알림 띄우기
const showEmptyInputAlert = function () {
    console.log('inside of showEmptyInputAlert')
    const allInputs = document.querySelectorAll('.form-control, .form-select');
    console.log('allInputs: ', allInputs)
    for (let i = 0; i < allInputs.length; i++) {
        let text = allInputs[i].value.trim();
        console.log('text: ', text)
        if (!text) {
            const emptyInputAlert = document.querySelector(`#question-empty-input-alert-${i}`)
            const sameInputAlert = document.querySelector(`#question-same-input-alert-${i}`)
            emptyInputAlert.style.display = 'block'
            sameInputAlert.style.display = 'none'
        }
    }
    
}

// 선택지 1, 2의 값이 다른지 확인
const checkValueDifference = function () {
    const options1 = document.querySelectorAll('.option1');
    const options2 = document.querySelectorAll('.option2');
    const scores1 = document.querySelectorAll('.option1-score')
    const scores2 = document.querySelectorAll('.option2-score')
    const booleanArray = []

    for (let i = 0; i<questionsDivs.length; i++) {
        let option1 = options1[i].value.trim();
        let option2 = options2[i].value.trim();
        let score1 = scores1[i].value;
        let score2 = scores2[i].value;
        if(option1 !== option2 && score1 !== score2) {
            booleanArray.push(true)
        } else {
            booleanArray.push(false)
            //기준점수 미만, 이상 값 같은 곳에 알림 띄우기
            const emptyInputAlert = document.querySelector(`#question-empty-input-alert-${i}`)
            const sameInputAlert = document.querySelector(`#question-same-input-alert-${i}`)
            emptyInputAlert.style.display = 'none'
            sameInputAlert.style.display = 'block'
        }
    }

    if (booleanArray.every(e => e)) {
        return true
    } else {
        return false
    }
}

//questions에 수정한 정보 넣기
const makeQuestionsArray = function () {
    return new Promise((resolve, reject) => {
        if(questionsDivs.length) {
            questions = []
            for (let i = 0; i < questionsDivs.length; i++) {
                const question = {}
                const option1 = {}
                const option2 = {}
                question.question = document.querySelector(`#question-${i}`).value.trim()
                option1.criterion = document.querySelector(`#option-criterion-select-${i}`).value
                option2.criterion = document.querySelector(`#option-criterion-select-${i}`).value
                option1.option = document.querySelector(`#option1-${i}`).value.trim();
                option1.score = document.querySelector(`#option-score-1-${i}`).value;
                option2.option = document.querySelector(`#option2-${i}`).value.trim()
                option2.score = document.querySelector(`#option-score-2-${i}`).value
                question.options = [option1, option2];
                questions.push(question)
            }    
            console.log('resolve')
            resolve('Successfully added all the questions')
        } else {
            const noQuestionAlert = document.querySelector('#no-question-alert');
            noQuestionAlert.style.display = 'block'
            console.log('reject')
            reject("There's no question")
        }
    })
}

//axios로 서버로 전송
const sendAxios = function () {
    const url = window.location.pathname;
    const id = url.split('/')[2];
    console.log('id: ', id);
    axios(url, {
        method: 'patch',
        data: questions
    }).then(function (res) {
        console.log('res: ', res);
        return window.location = `/showTest/${id}`
    }).catch(e => console.log(e))
}

//db에서 test 가져오기 
const getTestAxios = function () {
    const id = window.location.pathname.split('/')[2]
    axios.get(`/tests/${id}/conduct/axios`)
    .then((res) => {
        criteria = res.data.criteria;
        questions = res.data.questions;
        console.log('criteria: ', criteria)
        console.log('questions: ', questions)
    }).then(() => {
        addOptions();
    }).catch(e => console.log(e))
}
getTestAxios()


//채점기준 select에 option 추가
const addOptions = function () {
    for (let i = 0; i < criteria.length; i++) {
        //option elemenet 생성
        const newSelectOption = document.createElement('option')
        newSelectOption.setAttribute('value', criteria[i].name)
        newSelectOption.innerText = criteria[i].name;

        //원래 채점기준 디폴트 선택으로
        for (let j=0; j<questions.length; j++) {
            console.log('i: ', i, ' j: ', j)

            if(questions[j].options[0].criterion === criteria[i].name) {
                newSelectOption.setAttribute('selected', '')
            }        
        }

        //select에 option 추가
        const criterionSelects = document.querySelectorAll('.criterion-select');
        for (s of criterionSelects) {
            s.append(newSelectOption)
        }
        
    }
} 

//질문 삭제 버튼 
const activateDeleteButtons = function () {
    for (let i=0; i<deleteQuestionButtons.length; i++) {
        let count = i;
    
        deleteQuestionButtons[count].onclick = function() {
            questionsDivs[count].remove();
            //questionsDivs, deleteQuestionButtons 다시 query
            questionsDivs = document.querySelectorAll('.questions');  
            deleteQuestionButtons = document.querySelectorAll('.delete-question-button');
            activateDeleteButtons();

        }
    }    
}
activateDeleteButtons();


//질문 추가 버튼
addQuestionButton.addEventListener('click', function () {
    //1. elements 모두 추가
    //2. questionsDivs, deleteQuestionButtons 다시 query

    //container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'mb-5', 'questions');
    const all = document.querySelector('#all');
    all.append(containerDiv)

    //row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    containerDiv.appendChild(rowDiv);

    //border div
    const borderDiv = document.createElement('div');
    borderDiv.classList.add('col-md-10', 'offset-md-1', 'col-xl-8', 'offset-xl-2', 'border', 'rounded-3', 'border-2', 'border-primary', 'p-3')
    rowDiv.appendChild(borderDiv);

    //question div
    const questionDiv = document.createElement('div');
    const questionH6 = document.createElement('h6');
    const questionTextarea = document.createElement('textarea');
    questionDiv.classList.add('my-4', 'mx-4');
    questionH6.innerText = '질문'
    questionTextarea.classList.add('col-12', 'form-control', 'question');
    questionTextarea.setAttribute('id', `question-${questionsDivs.length}`)
    questionTextarea.setAttribute('rows', '2')
    questionTextarea.setAttribute('placeholder', '예)처음 보는 사람을 만나면 나는...')
    questionDiv.append(questionH6, questionTextarea)
    borderDiv.appendChild(questionDiv)

    //criteria div
    const criteriaDiv = document.createElement('div');
    const criteriaH6 = document.createElement('h6')
    const criteriaSelect = document.createElement('select');
    const criteriaOption = document.createElement('option');
    criteriaDiv.classList.add('my-4', 'mx-4')
    criteriaH6.innerHTML = '채점기준 <span class="text-muted">예) 에너지방향</span>'
    criteriaSelect.classList.add('form-select', 'criterion-select');
    criteriaSelect.setAttribute('id', `option-criterion-select-${questionsDivs.length}`);
    criteriaOption.setAttribute('selected', '')
    criteriaOption.setAttribute('value', '');
    criteriaOption.innerText = '선택'
    criteriaSelect.appendChild(criteriaOption)
    for (c of criteria) {
        const newOption = document.createElement('option')
        newOption.setAttribute('value', c.name)
        newOption.innerText = c.name
        criteriaSelect.appendChild(newOption);
    }
    criteriaDiv.append(criteriaH6, criteriaSelect)
    borderDiv.appendChild(criteriaDiv)

    //option1 div
    const option1Div = document.createElement('div')
    const option1H6 = document.createElement('h6')
    const option1Textarea = document.createElement('textarea')
    const option1Input = document.createElement('input')
    option1Div.classList.add('my-4', 'mx-4')
    option1H6.innerText = '선택지1'
    option1Textarea.classList.add('col-12', 'p-2', 'form-control', 'option1')
    option1Textarea.setAttribute('id', `option1-${questionsDivs.length}`)
    option1Textarea.setAttribute('rows', '2')
    option1Textarea.setAttribute('placeholder', '예)먼저 말을 걸고 금방 친해진다.')
    option1Input.classList.add('form-control', 'mt-1', 'option1-score')
    option1Input.setAttribute('type', 'number')
    option1Input.setAttribute('id', `option-score-1-${questionsDivs.length}`);
    option1Input.setAttribute('placeholder', '점수')
    option1Input.setAttribute('min', '0')
    option1Div.append(option1H6, option1Textarea, option1Input);
    borderDiv.appendChild(option1Div)

    //option2 div
    const option2Div = document.createElement('div')
    const option2H6 = document.createElement('h6')
    const option2Textarea = document.createElement('textarea')
    const option2Input = document.createElement('input')
    option2Div.classList.add('my-4', 'mx-4')
    option2H6.innerText = '선택지2'
    option2Textarea.classList.add('col-12', 'p-2', 'form-control', 'option2')
    option2Textarea.setAttribute('id', `option2-${questionsDivs.length}`)
    option2Textarea.setAttribute('rows', '2')
    option2Textarea.setAttribute('placeholder', '예)먼저 다가가지 않는다.')
    option2Input.classList.add('form-control', 'mt-1', 'option2-score')
    option2Input.setAttribute('type', 'number')
    option2Input.setAttribute('id', `option-score-2-${questionsDivs.length}`);
    option2Input.setAttribute('placeholder', '점수')
    option2Input.setAttribute('min', '0')
    option2Div.append(option2H6, option2Textarea, option2Input);
    borderDiv.appendChild(option2Div)

    //alert div
    const alertDiv = document.createElement('div');
    const emptyInputAlert = document.createElement('div');
    const sameInputAlert = document.createElement('div')
    alertDiv.classList.add('my-4', 'mx-4')
    emptyInputAlert.classList.add("col-10", 'offset-1', 'alert', 'alert-primary', 'my-4')
    emptyInputAlert.setAttribute('id', `question-empty-input-alert-${questionsDivs.length}`)
    emptyInputAlert.setAttribute('style', `display:none;`)
    emptyInputAlert.setAttribute('role', `alert`)
    emptyInputAlert.innerText = '모든 값을 입력한 후에 추가해 주세요'
    sameInputAlert.classList.add("col-10", 'offset-1', 'alert', 'alert-primary', 'my-4')
    sameInputAlert.setAttribute('id', `question-same-input-alert-${questionsDivs.length}`)
    sameInputAlert.setAttribute('style', `display:none;`)
    sameInputAlert.setAttribute('role', `alert`)
    sameInputAlert.innerText = '선택지1과 선택지2의 값이 같을 수 없습니다.'
    alertDiv.append(emptyInputAlert, sameInputAlert)
    borderDiv.appendChild(alertDiv)
    
    //delete button div
    const deleteDiv = document.createElement('div');
    const deleteButton = document.createElement('div')
    deleteDiv.classList.add('d-flex', 'justify-content-end', 'mt-4', 'mb-3', 'mx-4')
    deleteButton.classList.add('btn', 'btn-outline-primary', 'text-wrap', 'delete-criteria-button')
    deleteButton.setAttribute('id', 'delete-question-button-' + questionsDivs.length)
    deleteButton.setAttribute('type', 'button')
    deleteButton.innerText = '채점기준 삭제'
    deleteDiv.append(deleteButton)
    borderDiv.append(deleteDiv)

    //2. questionsDivs, deleteQuestionButtons 다시 query
    questionsDivs = document.querySelectorAll('.questions');  
    deleteQuestionButtons = document.querySelectorAll('.delete-question-button');
    activateDeleteButtons()


})

//질문 수정 완료 버튼
editQuestionButton.addEventListener('click', function () {
    console.log('clicked editQuestionButton')
    //0. questions에 들어갈 정보가 유효한지 확인 
    //  1) 모든 값이 입력됐는가?
    const isEveryInputFilled = checkEmptyInput();
    //  2) 기준점수 미만과 기준점수 이상이 다른 값인가?
    const isValueDifferent = checkValueDifference();

    if(!isEveryInputFilled) {
        showEmptyInputAlert()
        console.log('showEmptyInputAlert')
    } else if(!isValueDifferent) {
        checkValueDifference()
        console.log('checkValueDifference')
    } else if(questions.length < criteria.length) {
        //questions의 갯수가 criteria보다 적은 경우 
        alert('질문의 수가 채점 기준의 수보다 적습니다. 질문을 추가해주세요.')
    } else {
        //1. questions에 수정한 정보 넣기
        console.log('else')
        makeQuestionsArray()
        .then((res) => {
            console.log(res)
            //2. axios로 서버로 전송
            sendAxios();
        }).catch(e => console.log)
    }

})

//질문 추가해서 저장하면 저장 안됨