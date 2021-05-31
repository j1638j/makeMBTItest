//DOM
const copyURLButton = document.querySelector('#copy-url-button');
const testURL = document.querySelector('#testURL');

copyURLButton.addEventListener('click', function () {
    navigator.clipboard.writeText(testURL.innerText).then(function () {
        console.log('copied the URL')
    }, function () {
        console.log('failed to copy the URL')
    })
})