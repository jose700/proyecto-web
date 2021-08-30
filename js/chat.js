// BOTON IR ARRIBA TIPO SLIDER
$(document).ready(function() {
    $('.icon').click(function() {
        $('scroll-menu, html').animate({
            scrollTop: '400px'
        }, 500);
    });
});