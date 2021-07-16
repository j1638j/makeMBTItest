const editResultButton = document.querySelector('#edit-result-button')
const addResultButton = document.querySelector('#add-result-button')
let resultsDivs = document.querySelectorAll('.results')
let deleteResultButtons = document.querySelectorAll('.delete-result-button');
let results = []
let criteria = []




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
    nameInput.classList.add('form-control')
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

    //description div
    const descriptionDiv = document.createElement('div');
    const descriptionH6 = document.createElement('h6');
    const descriptionTextarea = document.createElement('textarea')
    descriptionDiv.classList.add('my-4', 'mx-5')
    descriptionH6.innerHTML = '설명 <span class="text-muted">예)통솔자형 사람은 천성적으로 타고난 리더로...</span>'
    descriptionTextarea.classList.add('form-control')
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
    perfectName.classList.add('form-control');
    perfectName.setAttribute('id', `result-perfect-match-name-${resultsDivs.length}`)
    perfectName.setAttribute('type', 'text')
    perfectName.setAttribute('placeholder', '별명 예)사교적인 외교관')
    perfectDescription.classList.add('form-control', 'mt-2')
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
    worstName.classList.add('form-control');
    worstName.setAttribute('id', `result-perfect-match-name-${resultsDivs.length}`)
    worstName.setAttribute('type', 'text')
    worstName.setAttribute('placeholder', '별명 예)사교적인 외교관')
    worstDescription.classList.add('form-control', 'mt-2')
    worstDescription.setAttribute('id', `result-perfect-match-description-${resultsDivs.length}`)
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
    sameInputAlert.classList.add('alert', 'alert-primary', 'my-3')
    sameInputAlert.setAttribute('id', `result-same-input-alert-${resultsDivs.length}`)
    sameInputAlert.setAttribute('style', 'display: none;')
    sameInputAlert.setAttribute('role', 'alert')
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

})


//결과 수정 완료 버튼
editResultButton.addEventListener('click', function() {

})