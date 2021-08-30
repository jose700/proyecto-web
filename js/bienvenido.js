/*const inputMensaje = document.getElementById("inputMensaje");*/
// DECLARAMOS UNA VARIABLE Y LUEGO HACEMOS EL LLAMADO DE LA ID DEL FORMULARIO DE INICIO DE SESION
var iniciarsesion = document.getElementById("formulario-login").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(iniciarsesion);
});
//AUTENTICAMOS MEDIANTE FIREBASE EN CASO DE INGRESRA SUS CREDENCIALES CORRECTAMENTE LO 
// REDIRIGIRA A UNA NUEVA PESTAÑA DE BIENVENIDA
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        location.replace("../views/bienvenido.html");
    }
});
// FUNCION PARA VERIFICAR Y HACER EL LLAMADO DEL EMAIL Y EL PASSWORD DEL USUARIO
function Bienvenido() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email, password)
        // CASO CONTRARIO MOSTRARA UN MENSAJE DE AUTENTICACION ERRONEA 
        .catch((error) => {
            toastr.error("Error de autenticacion el correo o la contraseña es incorrecta", error);
        });

}
// FUNCION PARA INICIAR SESION MEDIANTE CUENTA DE GOOGLE
function LoginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user.displayName);

            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}
// manejo de errores de cuentas que ya existen
function LoginGoogle() {

    // Step 1.
    // User tries to sign in to Google.
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
        // An error happened.
        if (error.code === 'auth/account-exists-with-different-credential') {
            // Step 2.
            alert("el usuario ya existe");
            // The pending Google credential.
            var pendingCred = error.credential;
            // The provider account's email address.
            var email = error.email;
            // Get sign-in methods for this email.
            auth.fetchSignInMethodsForEmail(email).then(function(methods) {
                // Step 3.
                // If the user has several sign-in methods,
                // the first method in the list will be the "recommended" method to use.
                if (methods[0] === 'password') {
                    // Asks the user their password.
                    // In real scenario, you should handle this asynchronously.
                    var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                    auth.signInWithEmailAndPassword(email, password).then(function(result) {
                        // Step 4a.
                        return result.user.linkWithCredential(pendingCred);
                    }).then(function() {
                        // Google account successfully linked to the existing Firebase user.
                        goToApp();
                    });
                    return;
                }
                // All the other cases are external providers.
                // Construct provider object for that provider.
                // TODO: implement getProviderForProviderId.
                var provider = getProviderForProviderId(methods[0]);
                // At this point, you should let the user know that they already has an account
                // but with a different provider, and let them validate the fact they want to
                // sign in with this provider.
                // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
                // so in real scenario you should ask the user to click on a "continue" button
                // that will trigger the signInWithPopup.
                auth.signInWithPopup(provider).then(function(result) {
                    // Remember that the user may have signed in with an account that has a different email
                    // address than the first one. This can happen as Firebase doesn't control the provider's
                    // sign in flow and the user is free to login using whichever account they own.
                    // Step 4b.
                    // Link to Google credential.
                    // As we have access to the pending credential, we can directly call the link method.
                    result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                        // Google account successfully linked to the existing Firebase user.
                        goToApp();
                    });
                });
            });
        }
    });


}

// FUNCION PARA RECUPERAR EL LA UID DEL USUARIO LOGUEADO MEDIANTE GOOGLE
function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {

                return true;
            }
        }
    }
    return false;
}
// FUNCION PARA INICIAR SESION MEDIANTE CUENTA DE FACEBOOK
function LoginFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            // ...
        });
}

// BOTON IR ARRIBA
$(document).ready(function() {
    $('.icon').click(function() {
        $('scroll-menu, html').animate({
            scrollTop: '300px'
        }, 500);
    });
});