//validar campos de pago
/* VALIDACION DE REGISTRO *************************************/
/*var validarPago = document.getElementById("pagar-form");

validarPago.onsubmit = function() {
    let nombres = document.getElementById('nombres').value;
    let apellidos = document.getElementById('apellidos').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let email = document.getElementById('email').value;

    if (nombres == "" || apellidos == "" || ciudad == 0 || direccion == "" || telefono == "" || email == "") {
        //alert("Error, todos los campos son obligatorios");
        toastr.error("Error, todos los campos son obligatorios");
        return false;
    } else {
        //alert('Gracias por iniciar sesion con nosotros');
        toastr.success("Su compra se porceso correctmente");
        return true;
    }
};*/

// guardamos los datos en una coleccion en la base de datos de firebase
// OBTENEMOS LA ID DE CADA CAMPO DONDE PODREMOS GUARDAR EN NUESTRA COLECCION LOS DTOS DE LOS USUARIOS
// QUE HAYAN RELIZADO COMPRA ALGUNAS
const pagar = document.querySelector("#pagar-form");
pagar.addEventListener("submit", async(e) => {

    const enviar = (nombres, apellidos, ciudad, direccion, telefono, email) => basedatospagos.collection('PagosRealizados').doc().set({
        nombres,
        apellidos,
        ciudad,
        direccion,
        telefono,
        email,
    });
    e.preventDefault();
    const nombres = pagar["nombres"].value;
    const apellidos = pagar["apellidos"].value;
    const ciudad = pagar["ciudad"].value;
    const direccion = pagar["direccion"].value;
    const telefono = pagar["telefono"].value;
    const email = pagar["email"].value;

    //const email = registrarse["correo"].value;
    //const password = registrarse["password"].value;

    await enviar(nombres, apellidos, ciudad, direccion, telefono, email);
    // AUTENTICACION DE USUARIOS
    //alert("Su pago se proceso correctamente");
    toastr.success("Su pago se proceso correctamente");
    //window.location.href = "VerFactura.html";
    target = "blank";
    pagar.reset();
    $('#pagar-form').modal('hide');
    pagar.reset();
});