(function () {
    'use strict'

    // Fetch the email we want to validate
    const password = document.querySelector('.validate-password')

    let timeout = null;

    // Fuction for counting time to know if the user finished
    const runTimeout = function () {

        clearTimeout(timeout);

        timeout = setTimeout(function(){
            const invalidFeedback = document.querySelector('#short-password-feedback');
            if(0 < password.value.length && password.value.length < 8) {
                invalidFeedback.style.display = 'block';
            } else {
                invalidFeedback.style.display = 'none';
            }

        }, 500);

    }


    password.addEventListener('keyup', function (event) {
        runTimeout();
    })

    password.addEventListener('paste', function (){
        runTimeout();
    })

})()
