const editResultButton = document.querySelector('#edit-result-button')
const addResultButton = document.querySelector('#add-result-button')
let resultsDivs = document.querySelectorAll('.results')
let deleteResultButtons = document.querySelectorAll('.delete-result-button');
let results = []
let criteria = []






//결과 삭제 버튼 *********고쳐야됨****************** 첫번째 결과 삭제하면 두번째 결과는 삭제 안됨
const activateDeleteButtons = function () {
    for (let i=0; i<deleteResultButtons.length; i++) {
        let count = i;
    
        deleteResultButtons[count].addEventListener('click', function() {
            resultsDivs[count].remove();
            //questionsDivs, deleteQuestionButtons 다시 query
            resultsDivs = document.querySelectorAll('.results');  
            deleteResultButtons = document.querySelectorAll('.delete-result-button');
        })
    }    
}
activateDeleteButtons();
