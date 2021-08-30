  // Your web app's Firebase configuration

  function sendPasswordReset() {
      // [START auth_send_password_reset]
      var email = document.getElementById("email2").value;
      firebase.auth().languageCode = 'it';
      firebase.auth().useDeviceLanguage();
      firebase.auth().sendPasswordResetEmail(email)
          .then(() => {
              console.log("se envio un mensaje para restablecer su contraseña")
          })
          .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log("error, ingrese un email valido.")
          });
  }