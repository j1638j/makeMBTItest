const editCriteriaButton = document.querySelector('#edit-criteria-button');
const addCriteriaButton = document.querySelector('#add-criteria-button')
let deleteCriteriaButtons = document.querySelectorAll('.delete-criteria-button');
let criterionDivs = document.querySelectorAll('.criterion');
let criteria = [];

//모든 값이 입력되었는지 확인
const checkEmptyInput = function () {
    const allInputs = document.querySelectorAll('.form-control');
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
    const allInputs = document.querySelectorAll('.form-control');
    for (let i = 0; i < criterionDivs.length; i++) {
        let text = allInputs[i].value.trim();
        if (!text) {
            const emptyInputAlert = document.querySelector(`#criteria-empty-input-alert-${i}`)
            const sameInputAlert = document.querySelector(`#criteria-same-input-alert-${i}`)
            emptyInputAlert.style.display = 'block'
            sameInputAlert.style.display = 'none'
        }
    }
}

//기준점수 미만, 이상 값이 다른지 확인
const checkValueDifference = function () {
    const allBelows = document.querySelectorAll('.criteria-below-standard-is');
    const allAboves = document.querySelectorAll('.criteria-standard-and-above-is');
    const booleanArray = []

    for (let i = 0; i<criterionDivs.length; i++) {
        let belowText = allBelows[i].value.trim();
        let aboveText = allAboves[i].value.trim();
        if(belowText !== aboveText) {
            booleanArray.push(true)
        } else {
            booleanArray.push(false)
            //기준점수 미만, 이상 값 같은 곳에 알림 띄우기
            const emptyInputAlert = document.querySelector(`#criteria-empty-input-alert-${i}`)
            const sameInputAlert = document.querySelector(`#criteria-same-input-alert-${i}`)
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

//criteria에 수정한 정보 넣기
const makeCriteriaArray = function () {
    if(criterionDivs.length) {
        for (let i = 0; i < criterionDivs.length; i++) {
            const criterion = {}
            criterion.name = document.querySelector(`#criteria-name-${i}`).value.trim();
            criterion.standardScore = document.querySelector(`#criteria-standard-score-${i}`).value.trim();
            criterion.belowStandardIs = document.querySelector(`#criteria-below-standard-is-${i}`).value.trim();
            criterion.standardAndAboveIs = document.querySelector(`#criteria-standard-and-above-is-${i}`).value.trim();
            criteria = []
            criteria.push(criterion)
        }    
    } else {
        const noCriteriaAlert = document.querySelector('#no-criteria-alert');
        noCriteriaAlert.style.display = 'block'
    }
}

//axios로 서버로 전송
const sendAxios = function () {
    const url = window.location.pathname;
    const id = url.split('/')[2];
    console.log('id: ', id);
    axios(url, {
        method: 'patch',
        data: criteria
    }).then(function (res) {
        console.log('res: ', res);
        return window.location = `/showTest/${id}`
    }).catch(e => console.log(e))
}

//채점기준 삭제 버튼
const activateDeleteButtons = function () {
    for (let i=0; i<deleteCriteriaButtons.length; i++) {
        let count = i;
    
        deleteCriteriaButtons[count].addEventListener('click', function() {
            console.log('deleteCriteriaButtons: ', deleteCriteriaButtons)
            console.log(`deleteCriteriaButtons[${count}]`)
            criterionDivs[count].remove();
            console.log('criterionDivs after remove: ', criterionDivs)
            //criterionDivs, deleteCriteriaButtons 다시 query
            criterionDivs = document.querySelectorAll('.criterion');  
            console.log('criterionDivs after query: ', criterionDivs)
            deleteCriteriaButtons = document.querySelectorAll('.delete-criteria-button');
            console.log('deleteCriteriaButtons after query: ', deleteCriteriaButtons)
        })
    }    
}
activateDeleteButtons();


//채점기준 추가 버튼
addCriteriaButton.addEventListener('click', function () {
    console.log('addCriteriaButton')
    //1. element 모두 추가
    //2. criterionDivs, deleteCriteriaButtons 다시 query


    //1. element 모두 추가
    //container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'mb-5', 'criterion');
    criterionDivs[criterionDivs.length-1].insertAdjacentElement('afterend', containerDiv);

    //row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    containerDiv.appendChild(rowDiv);

    //border div
    const borderDiv = document.createElement('div');
    borderDiv.classList.add('col-md-10', 'offset-md-1', 'col-xl-8', 'offset-xl-2', 'border', 'rounded-3', 'border-2', 'border-primary', 'p-3')
    rowDiv.appendChild(borderDiv);

    //criteria-name div
    const nameRowDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const nameH6 = document.createElement('h6');
    const nameInput = document.createElement('input');
    nameRowDiv.classList.add('row', 'mb-3', 'mt-5')
    nameDiv.classList.add('col-10', 'offset-1');
    nameH6.innerHTML = '채점기준 <span class="text-muted">예)에너지 방향</span>'
    nameInput.classList.add('form-control', 'criteria-name');
    nameInput.setAttribute('id', `criteria-name-${criterionDivs.length}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'criteria[name]');
    nameDiv.appendChild(nameH6);
    nameDiv.appendChild(nameInput);
    nameRowDiv.appendChild(nameDiv);
    borderDiv.appendChild(nameRowDiv);

    //criteria-standard-score div
    const standardScoreRowDiv = document.createElement('div');
    const standardScoreDiv = document.createElement('div');
    const standardScoreH6 = document.createElement('h6');
    const standardScoreInput = document.createElement('input');
    standardScoreRowDiv.classList.add('row', 'mb-3');
    standardScoreDiv.classList.add('col-10', 'offset-1');
    standardScoreH6.innerText = '기준점수';
    standardScoreInput.classList.add('form-control', 'criteria-standard-score');
    standardScoreInput.setAttribute('id', `criteria-standard-score-${criterionDivs.length}`)
    standardScoreInput.setAttribute('type', 'number')
    standardScoreInput.setAttribute('min', 0)
    standardScoreInput.setAttribute('name', 'criteria[standardScore]')
    standardScoreDiv.appendChild(standardScoreH6)
    standardScoreDiv.appendChild(standardScoreInput)
    standardScoreRowDiv.appendChild(standardScoreDiv);
    borderDiv.appendChild(standardScoreRowDiv)

    //criteria-below-standard-is div
    const belowRowDiv = document.createElement('div');
    const belowDiv = document.createElement('div');
    const belowH6 = document.createElement('h6');
    const belowInput = document.createElement('input');
    belowRowDiv.classList.add('row', 'mb-3');
    belowDiv.classList.add('col-10', 'offset-1');
    belowH6.innerText = '기준점수 미만';
    belowInput.classList.add('form-control', 'criteria-below-standard-is');
    belowInput.setAttribute('id', `criteria-below-standard-is-${criterionDivs.length}`)
    belowInput.setAttribute('type', 'text')
    belowInput.setAttribute('name', 'criteria[belowStandardIs]')
    belowInput.setAttribute('placeholder', 'type1')
    belowDiv.appendChild(belowH6)
    belowDiv.appendChild(belowInput)
    belowRowDiv.appendChild(belowDiv);
    borderDiv.appendChild(belowRowDiv)

    //criteria-standard-and-above-is div
    const aboveRowDiv = document.createElement('div');
    const aboveDiv = document.createElement('div');
    const aboveH6 = document.createElement('h6');
    const aboveInput = document.createElement('input');
    const emptyInputAlertDiv = document.createElement('div')
    const sameInputAlertDiv = document.createElement('div')
    aboveRowDiv.classList.add('row', 'mb-3');
    aboveDiv.classList.add('col-10', 'offset-1');
    aboveH6.innerText = '기준점수 이상';
    aboveInput.classList.add('form-control', 'criteria-standard-and-above-is');
    aboveInput.setAttribute('id', `criteria-standard-and-above-is-${criterionDivs.length}`)
    aboveInput.setAttribute('type', 'text')
    aboveInput.setAttribute('placeholder', 'type2')
    aboveInput.setAttribute('name', 'criteria[standardAndAboveIs]')
    emptyInputAlertDiv.classList.add('col-10', 'offset-1', 'alert', 'alert-primary', 'my-4')
    emptyInputAlertDiv.setAttribute('id', `criteria-empty-input-alert-${criterionDivs.length}`)
    emptyInputAlertDiv.setAttribute('style', 'display:none;')
    emptyInputAlertDiv.setAttribute('role', 'alert')
    emptyInputAlertDiv.innerText = '모든 값을 입력한 후에 추가해 주세요.'
    sameInputAlertDiv.classList.add('col-10', 'offset-1', 'alert', 'alert-primary', 'my-4')
    sameInputAlertDiv.setAttribute('id', `criteria-same-input-alert-${criterionDivs.length}`)
    sameInputAlertDiv.setAttribute('style', 'display:none;')
    sameInputAlertDiv.setAttribute('role', 'alert')
    sameInputAlertDiv.innerText = '기준점수 미만과 기준점수 이상이 같은 값일 수 없습니다.'
    aboveDiv.appendChild(aboveH6)
    aboveDiv.appendChild(aboveInput)
    aboveRowDiv.appendChild(aboveDiv);
    borderDiv.appendChild(aboveRowDiv)

    //delete-criteria-button div
    const deleteDiv = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteDiv.classList.add('d-flex', 'justify-content-end', 'mt-4', 'mb-3', 'px-5', 'mx-4');
    deleteButton.classList.add('btn', 'btn-outline-primary', 'text-wrap', 'delete-criteria-button');
    deleteButton.setAttribute('id', `delete-criteria-button-${criterionDivs.length}`);
    deleteButton.setAttribute('type', 'button');
    deleteButton.innerText = '채점기준 삭제';
    deleteDiv.appendChild(deleteButton);
    borderDiv.appendChild(deleteDiv)


    //2. criterionDivs, deleteCriteriaButtons 다시 query
    criterionDivs = document.querySelectorAll('.criterion');  
    console.log('criterionDivs: ', criterionDivs)
    deleteCriteriaButtons = document.querySelectorAll('.delete-criteria-button');
    activateDeleteButtons()
    console.log('deleteCriteriaButtons: ', deleteCriteriaButtons)

})


//채점기준 수정 완료 버튼
editCriteriaButton.addEventListener('click', function() {
    //0. criteria에 들어갈 정보가 유효한지 확인 
    //  1) 모든 값이 입력됐는가?
    const isEveryInputFilled = checkEmptyInput();
    //  2) 기준점수 미만과 기준점수 이상이 다른 값인가?
    const isValueDifferent = checkValueDifference();

    if(!isEveryInputFilled) {
        showEmptyInputAlert()
    } else if(!isValueDifferent) {
        checkValueDifference()
    } else {
    //1. criteria에 수정한 정보 넣기
    makeCriteriaArray();
    //2. axios로 서버로 전송
    sendAxios();
    }
})