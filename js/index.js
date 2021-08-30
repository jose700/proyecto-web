// FHACEMOS EL LLAMADO DEL BOTON DE AÑADIR
const Clickbutton = document.querySelectorAll('.button');
const tbody = document.querySelector('.tbody');
let carrito = [];
Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem);
});

// FUNCION PARA AÑADIR LOS PRODUCTOS CON SU REPECTIVA IMAGEN, TITULO, PRECIO E IMAGEN
function addToCarritoItem(e) {
    const button = e.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    // SE PUEDE AÑADIR NUEVOS PRODUCTOS Y ESTO LO SUMARA DENTRO DE LA MISMA
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    };

    addItemCarrito(newItem);
}

// FUNCION PARA MOSTRAR LOS MENSAJES DEL PRODUCTO SE AÑADIO CORRECTAMENTE
function addItemCarrito(newItem) {
    const alert = document.querySelector('.alert');
    // ESTE TENDRA UN TIEMPO 1000 (1SEG) Y LUEGO DE PASAR ESE TIEMPO OCULTARA EL MENSAJE
    setTimeout(function() {
        alert.classList.add('hide');
    }, 1000);
    alert.classList.remove('hide');

    // CREAMOS UNA CONSTANTE Y OBTENEMOS EL IMPUT DE TIPO NUMERIC, ESTO PARA 
    // QUE AL MOMENTO DE AÑADIR CANTIDAD ESTO LA VAYA SUMANDO CON EL PRECIO A PAGAR
    const InputElemnto = tbody.getElementsByClassName('input__elemento');
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemnto[i];
            inputValue.value++;
            CarritoTotal();
            return null;
        }
    }

    carrito.push(newItem);

    renderCarrito();
}

// FUNCION DONDE OBTENEMOS TODOS LOS PRODUCTOS AGREGADOS Y DONDE TAMBEN LO PODEMOS ELIMINAR
function renderCarrito() {
    tbody.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('ItemCarrito');
        // HACEMOS LA ESTRUCTURA DE UNA TABLA DONDE PODREMOS VISUALIZAR LOS PRODUCTOS AGREGADOS
        const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="" style="max-width:50%;">  
               <br><br>
                <br><br>
              <h6 class="title" >${item.title}</h6>
            </td>
            <td class="table__price""><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger"style="background-color:red; margin-left:-30%;margin-top:-15px">Eliminar</button>
             
            </td>
    
    `;
        tr.innerHTML = Content;
        tbody.append(tr);

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito);
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad);
    });
    CarritoTotal();
}
// FUNCOION PARA MOSTRAR EL TOTAL A PAGAR 
function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal');
    carrito.forEach((item) => {
        var precio = Number(item.precio.replace("$", ''));
        Total = Total + precio * item.cantidad;
    });

    itemCartTotal.innerHTML = `Total $${Total}`;
    addLocalStorage();
    //CarritoTotal.reset();
    $(document).on("keyup", "input[name*=cantidad]", function() {

        var Subtotal = $(this).val() * $(this).closest("tr").find("td:eq(1)").html();
        $(this).closest("tr").find("td:eq(3)").html(Subtotal.toFixed(2));
        getTotal();
    });
}


// FUNCION PARA ELIMINAR LOS PRODUCTOS DEL CARRITO Y MOSTRAR EL MENSAJE
function removeItemCarrito(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".ItemCarrito");
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1);
        }
    }
    const alert = document.querySelector('.remove');
    setTimeout(function() {
        alert.classList.add('remove');
    }, 1000);
    alert.classList.remove('remove');
    tr.remove();
    CarritoTotal();
}

// FUNCION PARA QUE CONFORME DE VAYA AÑAIDENDO CANTIDADES ESTE VAYA SUMANDO LOS VALORES 
function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal();
            sumaCantidad.reset();
        }
    });
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

window.onload = function() {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito();
    }
};