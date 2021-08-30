/* ANIMACION DE FORMULARIO ************************************/
var formLogin = document.getElementById("formulario-login");
var formRegistro = document.getElementById("formulario-registro");
var indicador = document.getElementById("indicador");

function registrar() {
    formRegistro.style.transform = "translateX(0px)";
    formLogin.style.transform = "translateX(0px)";
    indicador.style.transform = "translateX(155px)";
}

function login() {
    formRegistro.style.transform = "translateX(300px)";
    formLogin.style.transform = "translateX(300px)";
    indicador.style.transform = "translateX(45px)";
}

/* EXPRESIONES REGULARES **************************************/
const expresiones_nombre = /^[a-zA-Z]{4,20}$/;
const expresiones_correo = /^\w+@\w+\.+[aZ-zA]{2,3}$/;
const expresiones_contraseña = /^.{4,12}$/;
const expresiones_usuario = /^\w{4,16}$/;

/* VALIDACION DE REGISTRO *************************************/

const validarRegistro = document.getElementById("formulario-registro");
validarRegistro.onsubmit = function() {
    let nombre = document.getElementById("nombres").value;
    let usuario = document.getElementById("usuarioR").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("contraseña").value;

    if (nombre == "" || usuario == "" || correo == "" || password == "") {
        toastr.error("Todos los campos son obligatorios");
        return false;
    }
    if (!expresiones_nombre.test(nombre)) {
        toastr.warning("Error, el nombre debe contener solo letras");
        return false;
    } else if (!expresiones_correo.test(correo)) {
        toastr.warning("El correo debe de ser de tipo email");
        return false;

    } else if (!expresiones_contraseña.test(password)) {
        //alert("Error en la contraseña,excede el limite, ingrese nuevamente");
        toastr.warning("Error, la contraseña debe tener al menos 6 caracteres");
        return false;


    } else {
        //alert("Registro completado");
        //toastr.info("Te has registrado exitosamente");
        //validarRegistro.reset();
    }
};

//UTILIZAMOS ASYNC Y AWAIT DEBIDO A QUE SON DATOS ASINCRONOS CON LOS QUE SE TRABAJA
//Y ESTE A SU VEZ NOS DEBE DAR UNA PROMESA Y FINALMENTE GUARDAMOS NUESTROS DATOS EN 
// UNA COLECCION EN NUESTRA BASE DE DATOS DE FIREBASE.

const registrarse = document.querySelector("#formulario-registro");
registrarse.addEventListener("submit", async(e) => {
    const enviar = (nombres, usuario, correo, contraseña) => db.collection('UsuariosRegistrados').doc().set({
        nombres,
        usuario,
        correo,
        contraseña
    });
    e.preventDefault();

    const nombres = registrarse["nombres"].value;
    const usuario = registrarse["usuarioR"].value;
    const correo = registrarse["correo"].value;

    const contraseña = registrarse["contraseña"].value;

    //const email = registrarse["correo"].value;
    //const password = registrarse["password"].value;
    toastr.info("Te has registrado exitosamente");

    await enviar(nombres, usuario, correo, contraseña);
    // AUTENTICACION DE USUARIOS

    auth
        .createUserWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
            // RESETEAR FORMULARIO

            // registrarse.reset();


        });
});


//ENVIAR ENLACE PARA RESTABLECER CONTRASEÑA
function sendEmailVerification() {
    const email = document.getElementById("email");
    // [START send_email_verification]
    firebase.auth().languageCode = 'fr';
    const user = firebase.auth().currentUser;

    user.sendEmailVerification(email).then(() => {
        // Email sent.
        console.log("email enviado");
    }).catch((error) => {
        // An error ocurred

        console.log(error);
        // ...
    });
    // [END send_email_verification]
}

function updatePassword() {
    function getASecureRandomPassword() {
        return "Cambio exitoso";
    }

    // [START auth_update_password]
    const user = firebase.auth().currentUser;
    const newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(() => {
        //Contraseña actualizada.
    }).catch((error) => {
        // Error
        // ...
    });
    // 
}

/*function sendPasswordReset() {
    const auth = firebase.auth();
    firebase.auth().languageCode = 'it';
    firebase.auth().useDeviceLanguage();
    const sendpass = document.getElementById("correo2").value;
    // [START auth_send_password_reset]
    firebase.auth().sendPasswordResetEmail(sendpass)
        .then(() => {
            // Password reset email sent!
            alert("Se envio un correo de verificacion de cuenta");
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            //alert("error", errorCode);
            alert("error", errorMessage);
            //toastr.warning("Error, asegurate de escribir bien tu correo electronico");
            // ..
        });
}*/
var invocation = new XMLHttpRequest();
var url = 'http://localhost:3000/views/login.html';

function callOtherDomain() {
    if (invocation) {
        invocation.open('POST', url, true);
        invocation.onreadystatechange = handler;
        invocation.send();
    }
}


// [END auth_send_password_reset]



/* 
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("Estas Logueado");
        db.collection("UsuariosRegistrados")
            .get()
            .then((snapshot) => {
                setupPosts(snapshot.docs);
                loginCheck(user);
                window.location.href = "bienvenido.html";
            });
    } else {
        console.log("Has salido");
        setupPosts([]);
        loginCheck(user);
    }
});*/