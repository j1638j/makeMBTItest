(function () {
    'use strict'

    // Fetch the email we want to validate
    const email = document.querySelector('.validate-email')

    let timeout = null;

    // Fuction for counting time to know if the user finished
    const sendAxiosTimeout = function () {

        clearTimeout(timeout);

        timeout = setTimeout(function(){
            const invalidFeedback = document.querySelector('.invalid-email')
            const emailValue = {email: email.value};
            console.log('email.value is: ', emailValue)
            axios('/uniqueEmail', {
                method: 'post',
                data: emailValue,
            }).then(function (res) {
                console.log('checking if the email is unique');
                console.log('res: ', res);
                console.log('res.body: ', res.data);
                if (!res.data.isEmailUnique) {
                    invalidFeedback.style.display = "block";
                }
            }).catch(e => { console.log(e) })

        }, 1000);

    }




    email.addEventListener('keyup', function (event) {
        sendAxiosTimeout();
    })

    email.addEventListener('paste', function (){
        sendAxiosTimeout();
    })

})()
