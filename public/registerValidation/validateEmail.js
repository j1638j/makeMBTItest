(function () {
    'use strict'

    // Fetch the email we want to validate
    const email = document.querySelector('.validate-email')

    let timeout = null;

    // Fuction for counting time to know if the user finished
    const sendAxiosTimeout = function () {

        clearTimeout(timeout);

        timeout = setTimeout(function(){
            const existFeedback = document.querySelector('#exist-email-feedback');
            const invalidFeedback = document.querySelector('#invalid-email-feedback');
            const validFeedback = document.querySelector('#valid-email-feedback');
            const emailValue = {email: email.value};
            console.log('email.value is: ', emailValue)
            axios('/uniqueEmail', {
                method: 'post',
                data: emailValue,
            }).then(function (res) {
                console.log('checking if the email is unique');
                console.log('res: ', res);
                console.log('res.body: ', res.data);
                const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if (!res.data.isEmailUnique) {
                    existFeedback.style.display = "block";
                    validFeedback.style.display = 'none';
                    invalidFeedback.style.display = 'none'
                } else if (emailValue.email === '') {
                    existFeedback.style.display = validFeedback.style.display = invalidFeedback.style.display = 'none';
                } else if (emailValue.email.search(regExp) === -1) {
                    existFeedback.style.display = "none";
                    validFeedback.style.display = 'none';
                    invalidFeedback.style.display = 'block'
                } else {
                    existFeedback.style.display = "none";
                    validFeedback.style.display = 'block';
                    invalidFeedback.style.display = 'none'
                }
            }).catch(e => { console.log(e) })

        }, 500);

    }




    email.addEventListener('keyup', function (event) {
        sendAxiosTimeout();
    })

    email.addEventListener('paste', function (){
        sendAxiosTimeout();
    })

})()
