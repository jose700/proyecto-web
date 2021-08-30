//DECLARAMOS UNA VARIABLE  Y HACEMOS UNA FUNCION ESTO PARA HACER EL LLAMADO DE LA API DE GOOGLE MAPS
// Y TOMAMOS LA ID PARA PODER VISUALIZAR EL MAPA 
var panorama;

function initialize() {
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("street-view"), {
            position: {
                lat: -0.96212,
                lng: -80.71271,
            },
            pov: {
                heading: 165,
                pitch: 0,
            },
            zoom: 1,
        }
    );
}