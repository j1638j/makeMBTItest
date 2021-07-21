const editResultButton = document.querySelector('#edit-result-button')
const addResultButton = document.querySelector('#add-result-button')
let resultsDivs = document.querySelectorAll('.results')
let deleteResultButtons = document.querySelectorAll('.delete-result-button');
let results = []
let criteria = []


//모든 값이 입력되었는지 확인
const checkEmptyInput = function () {
    const allInputs = document.querySelectorAll('.required');
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
    for (let j = 0; j < resultsDivs.length; j++) {
        const allInputs = document.querySelectorAll(`.required-${j}`);
        console.log('allInputs: ', allInputs)
        for (let i = 0; i < allInputs.length; i++) {
            let text = allInputs[i].value.trim();
            console.log('text: ', text)
            if (!text) {
                const emptyInputAlert = document.querySelector(`#result-empty-input-alert-${j}`)
                const sameInputAlert = document.querySelector(`#result-same-input-alert-${j}`)
                emptyInputAlert.style.display = 'block'
                sameInputAlert.style.display = 'none'
            }
        }    
    }
}

// 선택지 1, 2의 값이 다른지 확인
const checkValueDifference = function () {
    const perfectMatchNames = document.querySelectorAll('.perfect-match-name');
    const perfectMatchDescriptions = document.querySelectorAll('.perfect-match-description');
    const worstMatchNames = document.querySelectorAll('.worst-match-name')
    const worstMatchDescriptions = document.querySelectorAll('.worst-match-description')
    const booleanArray = []
    console.log('perfectMatchNames: ', perfectMatchNames)

    for (let i = 0; i<resultsDivs.length; i++) {
        let perfectName = perfectMatchNames[i].value.trim();
        let perfectDescription = perfectMatchDescriptions[i].value.trim();
        let worstName = worstMatchNames[i].value.trim();
        let worstDescription = worstMatchDescriptions[i].value.trim();
        if(!perfectName && !worstName) {
            booleanArray.push(true)
        } else if (perfectName !== worstName && perfectDescription !== worstDescription) {
            booleanArray.push(true)
        } else {
            booleanArray.push(false)
            //기준점수 미만, 이상 값 같은 곳에 알림 띄우기
            const emptyInputAlert = document.querySelector(`#result-empty-input-alert-${i}`)
            const sameInputAlert = document.querySelector(`#result-same-input-alert-${i}`)
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
const makeResultsArray = function () {
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
        data: results
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
        results = res.data.results;
        console.log('criteria: ', criteria)
        console.log('results: ', results)
    }).then(() => {
        addOptions();
    }).catch(e => console.log(e))
}
getTestAxios()


//채점기준 select에 option 추가
const addOptions = function () {
    for (let i = 0; i < resultsDivs.length; i++) {
    
        //원래 채점기준 디폴트 선택으로
        for (let j=0; j<criteria.length; j++) {
            console.log('i: ', i, ' j: ', j)

            //select, option 생성
            const newSelect = document.createElement('select')
            newSelect.classList.add('form-select', 'mb-1')
            const newOptionType = document.createElement('option')
            newOptionType.setAttribute('value', '')
            newOptionType.setAttribute('selected', '')
            newOptionType.innerText = criteria[j].name;
            const option1 = document.createElement('option')
            const option2 = document.createElement('option')
            option1.setAttribute('value', criteria[j].belowStandardIs)
            option1.innerText = criteria[j].belowStandardIs
            option2.setAttribute('value', criteria[j].standardAndAboveIs)
            option2.innerText = criteria[j].standardAndAboveIs
            newSelect.append(newOptionType, option1, option2)
            const resultTypeDiv = document.querySelector('#result-type-div-' + i)
            resultTypeDiv.append(newSelect)
        }
        
    }
} 



//결과 삭제 버튼 
const activateDeleteButtons = function () {
    for (let i=0; i<deleteResultButtons.length; i++) {
        let count = i;
    
        deleteResultButtons[count].onclick = function() {
            resultsDivs[count].remove();
            //questionsDivs, deleteQuestionButtons 다시 query
            resultsDivs = document.querySelectorAll('.results');  
            deleteResultButtons = document.querySelectorAll('.delete-result-button');
            activateDeleteButtons();

        }
    }    
}
activateDeleteButtons();


//결과 추가 버튼
addResultButton.addEventListener('click', function () {
    //1. elements 모두 추가
    //2. questionsDivs, deleteQuestionButtons 다시 query
    
    //container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'mb-3', 'results');
    const all = document.querySelector('#all');
    all.append(containerDiv)

    //row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    containerDiv.appendChild(rowDiv);

    //border div
    const borderDiv = document.createElement('div');
    borderDiv.classList.add('col-md-10', 'offset-md-1', 'col-xl-8', 'offset-xl-2', 'border', 'rounded-3', 'border-2', 'border-primary', 'mt-3', 'p-3')
    rowDiv.appendChild(borderDiv);

    //name div
    const nameDiv = document.createElement('div');
    const nameH6 = document.createElement('h6');
    const nameInput = document.createElement('input');
    nameDiv.classList.add('my-4', 'mx-5')
    nameH6.innerHTML = '별명 <span class="text-muted">예)대담한 통솔자</span>'
    nameInput.classList.add('form-control', 'required', 'required-'+resultsDivs.length)
    nameInput.setAttribute('id', `result-name-input-${resultsDivs.length}`)
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('required', '')
    nameDiv.append(nameH6, nameInput)
    borderDiv.appendChild(nameDiv)

    //type div
    const typeDiv = document.createElement('div');
    const typeH6 = document.createElement('h6');
    typeDiv.classList.add('my-4', 'mx-5');
    typeH6.innerHTML = '타입 <span class="text-muted">예) 에너지방향: E</span>'
    typeDiv.append(typeH6)
    borderDiv.append(typeDiv)
    for (let i=0; i<criteria.length; i++) {
        //select, option 생성
        const newSelect = document.createElement('select')
        newSelect.classList.add('form-select', 'mb-1','required', 'required-'+resultsDivs.length)
        const newOptionType = document.createElement('option')
        newOptionType.setAttribute('value', '')
        newOptionType.setAttribute('selected', '')
        newOptionType.innerText = criteria[i].name;
        const option1 = document.createElement('option')
        const option2 = document.createElement('option')
        option1.setAttribute('value', criteria[i].belowStandardIs)
        option1.innerText = criteria[i].belowStandardIs
        option2.setAttribute('value', criteria[i].standardAndAboveIs)
        option2.innerText = criteria[i].standardAndAboveIs
        newSelect.append(newOptionType, option1, option2)
        typeDiv.append(newSelect)
    }

    //description div
    const descriptionDiv = document.createElement('div');
    const descriptionH6 = document.createElement('h6');
    const descriptionTextarea = document.createElement('textarea')
    descriptionDiv.classList.add('my-4', 'mx-5')
    descriptionH6.innerHTML = '설명 <span class="text-muted">예)통솔자형 사람은 천성적으로 타고난 리더로...</span>'
    descriptionTextarea.classList.add('form-control', 'required', `required-${resultsDivs.length}`)
    descriptionTextarea.setAttribute('id', `result-description-textarea-${resultsDivs.length}`)
    descriptionDiv.append(descriptionH6, descriptionTextarea)
    borderDiv.append(descriptionDiv)

    //perfect match div
    const perfectDiv = document.createElement('div');
    const perfectH6 = document.createElement('h6');
    const perfectName = document.createElement('input');
    const perfectDescription = document.createElement('textarea')
    perfectDiv.classList.add('my-4', 'mx-5')
    perfectH6.innerHTML = '최고의 궁합 <span class="text-muted">(선택사항)</span>'
    perfectName.classList.add('form-control', 'perfect-match-name');
    perfectName.setAttribute('id', `result-perfect-match-name-${resultsDivs.length}`)
    perfectName.setAttribute('type', 'text')
    perfectName.setAttribute('placeholder', '별명 예)사교적인 외교관')
    perfectDescription.classList.add('form-control', 'mt-2', 'perfect-match-description')
    perfectDescription.setAttribute('id', `result-perfect-match-description-${resultsDivs.length}`)
    perfectDescription.setAttribute('placeholder', '설명 예)사교형 사람은 통솔자형 사람과...')
    perfectDiv.append(perfectH6, perfectName, perfectDescription)
    borderDiv.append(perfectDiv)

    //worst match div
    const worstDiv = document.createElement('div');
    const worstH6 = document.createElement('h6');
    const worstName = document.createElement('input');
    const worstDescription = document.createElement('textarea')
    worstDiv.classList.add('my-4', 'mx-5')
    worstH6.innerHTML = '최악의 궁합 <span class="text-muted">(선택사항)</span>'
    worstName.classList.add('form-control', 'worst-match-name');
    worstName.setAttribute('id', `result-worst-match-name-${resultsDivs.length}`)
    worstName.setAttribute('type', 'text')
    worstName.setAttribute('placeholder', '별명 예)사교적인 외교관')
    worstDescription.classList.add('form-control', 'mt-2', 'worst-match-description')
    worstDescription.setAttribute('id', `result-worst-match-description-${resultsDivs.length}`)
    worstDescription.setAttribute('placeholder', '설명 예)사교형 사람은 통솔자형 사람과...')
    worstDiv.append(worstH6, worstName, worstDescription)
    borderDiv.append(worstDiv)

    //alert div
    const alertDiv = document.createElement('div')
    const emptyInputAlert = document.createElement('div')
    const sameInputAlert = document.createElement('div')
    alertDiv.classList.add('d-flex', 'justify-content-center', 'my-3')
    emptyInputAlert.classList.add('alert', 'alert-primary', 'my-3')
    emptyInputAlert.setAttribute('id', `result-empty-input-alert-${resultsDivs.length}`)
    emptyInputAlert.setAttribute('style', 'display: none;')
    emptyInputAlert.setAttribute('role', 'alert')
    emptyInputAlert.innerText = '모든 값을 입력한 후에 추가해 주세요.'
    sameInputAlert.classList.add('alert', 'alert-primary', 'my-3')
    sameInputAlert.setAttribute('id', `result-same-input-alert-${resultsDivs.length}`)
    sameInputAlert.setAttribute('style', 'display: none;')
    sameInputAlert.setAttribute('role', 'alert')
    sameInputAlert.innerText = '최고의 궁합과 최악의 궁합의 값이 같을 수 없습니다.'
    alertDiv.append(emptyInputAlert, sameInputAlert)
    borderDiv.append(alertDiv)

    //delete button div
    const deleteDiv = document.createElement('div')
    const deleteButton = document.createElement('button')
    deleteDiv.classList.add('d-flex', 'justify-content-end', 'mt-3', 'mb-3')
    deleteButton.classList.add('btn', 'btn-outline-primary', 'text-wrap', 'mx-5', 'delete-result-button')
    deleteButton.setAttribute('type', 'button')
    deleteButton.innerText = '결과 삭제'
    deleteDiv.append(deleteButton)
    borderDiv.append(deleteDiv)

    //2. resultsDivs, deleteResultsButtons 다시 query
    resultsDivs = document.querySelectorAll('.results');  
    deleteResultButtons = document.querySelectorAll('.delete-result-button');
    activateDeleteButtons()


})


//결과 수정 완료 버튼
editResultButton.addEventListener('click', function() {
    //0. questions에 들어갈 정보가 유효한지 확인 
    //  1) 모든 값이 입력됐는가?
    const isEveryInputFilled = checkEmptyInput();
    console.log('isEveryInputFilled: ', isEveryInputFilled)
    //  2) 기준점수 미만과 기준점수 이상이 다른 값인가?
    const isValueDifferent = checkValueDifference();
    console.log('isValueDifferenct: ', isValueDifferent)

    if(!isEveryInputFilled) {
        showEmptyInputAlert()
    } else if(!isValueDifferent) {
        checkValueDifference()
    } else if(resultsDivs.length < 2**criteria.length) {
        // !==로 바꿀까?
        alert('질문의 수가 채점 기준의 수보다 적습니다. 질문을 추가해주세요.')
    } else {
        //1. results 수정한 정보 넣기
        console.log('else')
        makeQuestionsArray()
        .then((res) => {
            console.log(res)
            //2. axios로 서버로 전송
            sendAxios();
        }).catch(e => console.log)
    }

})