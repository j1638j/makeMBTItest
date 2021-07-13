const editQuestionButton = document.querySelector('#edit-question-button')
const addQuestionButton = document.querySelector('#add-question-button')
let questionsDivs = document.querySelectorAll('.questions')
let deleteQuestionButtons = document.querySelectorAll('.delete-question-button');
let questions = []
let criteria = []

//db에서 test 가져오기 
const getCriteriaAxios = function () {
    const id = window.location.pathname.split('/')[2]
    axios.get(`/tests/${id}/conduct/axios`)
    .then((res) => {
        criteria = res.data.criteria;
    }).then(() => {
        addOptions()
    }).catch(e => console.log(e))
}
getCriteriaAxios()

//채점기준 select에 option 추가
const addOptions = function () {
    for (c of criteria) {
        const newSelectOption = document.createElement('option')
        newSelectOption.setAttribute('value', c.name)
        newSelectOption.innerText = c.name;
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
    
        deleteQuestionButtons[count].addEventListener('click', function() {
            questionsDivs[count].remove();
            //questionsDivs, deleteQuestionButtons 다시 query
            questionsDivs = document.querySelectorAll('.questions');  
            deleteQuestionButtons = document.querySelectorAll('.delete-question-button');
        })
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
    questionsDivs[questionsDivs.length-1].insertAdjacentElement('afterend', containerDiv);

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

})

//질문 수정 완료 버튼
editQuestionButton.addEventListener('click', function () {

})