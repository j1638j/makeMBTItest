(function () {
    'use strict'

    // Fetch the email we want to validate
    const password = document.querySelector('.validate-password')
    const checkPassword = document.querySelector('.validate-check-password')

    let timeout = null;

    // Fuction for counting time to know if the user finished
    const runTimeout = function () {

        clearTimeout(timeout);

        timeout = setTimeout(function(){
            const invalidFeedback = document.querySelector('#password-match-feedback');
            if(password.value !== checkPassword.value) {
                invalidFeedback.style.display = 'block';
            } else {
                invalidFeedback.style.display = 'none';
            }

        }, 500);

    }


    checkPassword.addEventListener('keyup', function (event) {
        runTimeout();
    })

    checkPassword.addEventListener('paste', function (){
        runTimeout();
    })

})()
