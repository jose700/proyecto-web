function sendPasswordReset() {
    const auth = firebase.auth();
    // [START auth_send_password_reset]
    firebase.auth().languageCode = 'it';
    firebase.auth().useDeviceLanguage();
    const email2 = document.getElementById("email2").value;
    firebase.auth().sendPasswordResetEmail(email2)
        .then(() => {
            // Password reset email sent!
            alert("Se envio un correo de verificacion de cuenta");
           // console.log(email);
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error");
            // ..
        });
}

//recuperar contraseña
/*$("#btn-resetPassword").click(function() {
    var auth = firebase.auth();
    var email = $("#email").val();
    if (email != "") {

        auth.sendPasswordResetEmail(email).then(function() {
                //alert("Se le acabo de enviar un codigo a su correo electronico para restablecer su contraseña");
                crossOriginIsolated.log("Se le acabo de enviar un codigo a su correo electronico para restablecer su contraseña");
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert("Error: " + errorMessage);

            });
    } else {
        //alert("Por favor escriba su correo electronico");
        
    }
});*/