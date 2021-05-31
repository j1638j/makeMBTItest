const optionButton1 = document.querySelector('#option-button-1');
const optionButton2 = document.querySelector('#option-button-2');
const currentURL = window.location.href;
const test = new Object;


//axios function
const callAxios = function (currentURL) {
    const config = { headers: { Accept: 'application/json' } }
    const url = currentURL + '/axios'
    axios.get(url, config)
        .then(function (res) {
            console.dir(res)
            test = res.data;
        }).catch(e => console.log(e))
}



optionButton1.addEventListener('click', function () {
    callAxios()

})