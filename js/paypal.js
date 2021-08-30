    // Render the PayPal button into #paypal-button-container
    //AGREGAMOS LA API DE PAYPAL PARA AGREGAR EL BOTON DE COMPRA POR MEDIO DE PAYPAL
    paypal.Buttons({
        env: 'sandbox', //production, sandbox
        style: {

            //layout: 'horizontal',
            label: 'checkout', // credit , pay , buynow, generic
            //size: 'responsive', // samll, meium, large, responsive
            shape: 'pill', // pill, rect
            color: 'gold', // gold, blue, silver, black


        },

        client: {
            sandbox: 'AVoUK8uh1cDSOsa82XMsW6nMASv3ErVe9yUPWlG65ffkINA2A1ulvme65NDl-5tbDqBdrM0y9Js5YTWE',
            production: 'AdpoDZNnrTRhKkBbv4gY1ygOEElfgR25oWswcCmrcdJwswtI9xeq7ndFqnlXqRbztyIqax7-j0JEO1ol'
        },
        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [{

                    }]
                }
            });
        },


        //MOSTAR SI EL PAGO SE REALIZO CORRECTAMENTE
        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                console.log(data);
                //ESTA FUNCION NOS DIRIGIRA A UNA NUEVA PAGINA

            });
        }
    }).render('#paypal-button-container');