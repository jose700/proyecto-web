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
var expresiones_nombre = /^[a-zA-Z]{4,20}$/;
var expresiones_correo = /^\w+@\w+\.+[a-z]{2,3}$/;
var expresiones_contraseña = /^.{4,12}$/;
var expresiones_usuario = /^\w{4,16}$/;

/* VALIDACION DE REGISTRO *************************************/
var validarRegistro = document.getElementById("formulario-registro");

validarRegistro.onsubmit = function() {
    let nombre = document.getElementById('nombres').value;
    let usuario = document.getElementById('usuarioR').value;
    let correo = document.getElementById('correo').value;
    let password = document.getElementById('contraseña').value;

    if (nombre == "" || usuario == "" || correo == "" || password == "") {
        alert("Campos obligatorios");
        return false;
    }

    if (!expresiones_nombre.test(nombre)) {
        alert("El nombre esta mal escrito");
        return false;
    } else if (!expresiones_correo.test(correo)) {
        alert("El correo esta mal escrito");
        return false;
    } else if (!expresiones_contraseña.test(password)) {
        alert("Error en la contraseña, ingrese nuevamente");
        return false;
    } else {
        alert("Registro completado");
        validarRegistro.reset();
    }
};

/* VALIDACION DE LOGIN ****************************************/
var validarLogin = document.getElementById("formulario-login");

validarLogin.onsubmit = function() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email == "" || password == "") {
        alert("Algunos campos faltan por llenar");
        return false;
    } else {
        //alert('Gracias por iniciar sesion con nosotros');
        toastr.sucess("Gracias por iniciar sesion con nosotros");
        return true;
    }
};