// FUNCION DONBDE VALIDAMOS LAS OPINIONES DE LOS USUARIOS
function enviar() {
    var correo_opinion = document.getElementById('correo_opinion').value;
    var opinion = document.getElementById('comentario').value;

    if (correo_opinion == "" || opinion == "") {
        alert("Todos los campos son obligatorios");
    } else {
        alert("gracias por por tus comentarios.");
        e.preventDefault();
    }
}
// CHAT 
var _smartsupp = _smartsupp || {};
_smartsupp.key = 'b72b89bbb75a75d7b50be6b84e32dcc4c2beb2d6';
window.smartsupp || (function(d) {
    var s, c, o = smartsupp = function() {
        o._.push(arguments)
    };
    o._ = [];
    s = d.getElementsByTagName('script')[0];
    c = d.createElement('script');
    c.type = 'text/javascript';
    c.charset = 'utf-8';
    c.async = true;
    c.src = 'https://www.smartsuppchat.com/loader.js?';
    s.parentNode.insertBefore(c, s);
})(document);