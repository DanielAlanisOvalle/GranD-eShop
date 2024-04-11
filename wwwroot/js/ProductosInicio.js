document.addEventListener('DOMContentLoaded', () => {
//    localStorage.removeItem('carrito');
});

const modalProductos = $('#modalProductos');
const decreaseBtn = $('#decreaseBtn')[0];
const increaseBtn = $('#increaseBtn')[0];
const quantityInput = $('#quantityInput');
let lblEntrega = $('#lblEntrega');
const btnAgregarAlCarrito = $('#btnAgregarAlCarrito');
let arrayCarrito = [];
const toastEl = document.querySelector('.toast');
const modalComprarAhora = $('#modalComprarAhora');
const btnComprar = $('#btnComprar');
let inputDireccion = $("#inputDireccion");
let inputColonia = $("#inputColonia");
let inputCiudad = $("#inputCiudad");
let inputCodigoPostal = $("#inputCodigoPostal");
let metodoPago = $("#metodoPago");
let numeroTarjeta = $("#numeroTarjeta");
let correoPaypal = $("#correoPaypal");
let FechaTarjeta = $("#FechaTarjeta");
let cvv = $("#cvv");
let resumenDireccion = $("#resumenDireccion");
let resumenColonia = $("#resumenColonia");
let resumenCiudad = $("#resumenCiudad");
let resumenCodigoPostal = $("#resumenCodigoPostal");
let resumenMetodoPago = $("#resumenMetodoPago");
let resumenNumeroTarjeta = $("#resumenNumeroTarjeta");
let resumenCorreoPaypal = $("#resumenCorreoPaypal");
let totalAPagar = $("#totalAPagar");
const imgModal = $('#imgModal');
const lblTitleProducto = $('#lblTitleProducto');
const lblPrecio = $('#lblPrecio');
const lblDescripcion = $('#lblDescripcion');
const lblRating = $('#lblRating');
const imgComprarAhora = $('#imgComprarAhora');
const lblTitleComprarAhora = $('#lblTitleComprarAhora');
const lblDescripcionComprarAhora = $('#lblDescripcionComprarAhora');
const btnConfirmarComprarAhora = $('#btnConfirmarComprarAhora');

let ProductoActual = {
    Nombre: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Rating: '',
    Cantidad: 0,
    Talla: '',
    ID: 0
}
let Talla;
let Articulo;

function mostrarModalProducto(ID) {
    Articulo = productos.find(item => item.id == ID);
    imgModal.attr('src', Articulo.image);
    lblTitleProducto.text(Articulo.title);
    lblPrecio.text('$' + Articulo.price);
    lblDescripcion.text(Articulo.description);
    lblRating.text(Articulo.rating.rate + ' (' + Articulo.rating.count + ')');
    imgComprarAhora.attr('src', Articulo.image);
    lblTitleComprarAhora.text(Articulo.title);
    lblDescripcionComprarAhora.text(Articulo.description);


    function actualizarTiempoRestante() {
        const ahora = new Date();

        const entregaHora = new Date();
        entregaHora.setHours(19, 0, 0);
        let diferencia = entregaHora - ahora;
        const horasRestantes = Math.floor(diferencia / 3600000);
        const minutosRestantes = Math.floor((diferencia % 3600000) / 60000);

        if (Articulo.id % 2 === 0) {
            if (horasRestantes > 0 || minutosRestantes > 0) {
                document.getElementById('lblEntrega').innerHTML = `Entrega <span class="gratis">GRATIS</span> mañana o recoge en ${horasRestantes} horas y ${minutosRestantes} minutos`;
            }
            else {
                document.getElementById('lblEntrega').innerHTML = `Entrega <span class="gratis">GRATIS</span> mañana o recoge mañana`;
            }
        }
        else {
            if (horasRestantes > 0 || minutosRestantes > 0) {
                document.getElementById('lblEntrega').textContent = `Entrega mañana o recoge en ${horasRestantes} horas y ${minutosRestantes} minutos`;
            }
            else {
                document.getElementById('lblEntrega').textContent = `Entrega mañana o recoge mañana`;
            }
        }
    }
    actualizarTiempoRestante();
    setInterval(actualizarTiempoRestante, 60000);
    setRating(Articulo.rating.rate);
    modalProductos.modal('show');
    quantityInput.value = 1;
    limpiarInputs();
}

//******************** BOTONES ************************
btnConfirmarComprarAhora.click(function (e) {
    mostrarNotificacionPersonalizada();
});

metodoPago.on('change', () => {
    numeroTarjeta.focus();
});

numeroTarjeta.on('keypress', (event) => {
    if (event.keyCode == 13) {
        FechaTarjeta.focus();
    }
});

FechaTarjeta.on('keypress', (event) => {
    if (event.keyCode == 13) {
        cvv.focus();
    }
});

inputDireccion.on('keypress', (event) => {
    if (event.keyCode == 13) {
        inputColonia.focus();
    }
});

inputColonia.on('keypress', (event) => {
    if (event.keyCode == 13) {
        inputCiudad.focus();
    }
});

inputCiudad.on('keypress', (event) => {
    if (event.keyCode == 13) {
        inputCodigoPostal.focus();
    }
});

const botonesTalla = document.getElementsByName('btnTalla');
botonesTalla.forEach(boton => {
    boton.addEventListener('click', function () {
        Talla = this.value;
    });
});

btnComprar.click(function (e) {
    modalComprarAhora.modal('show');
});

function limpiarInputs() {
    inputDireccion.val("");
    inputColonia.val("");
    inputCiudad.val("");
    inputCodigoPostal.val("");
    metodoPago.prop("selectedIndex", 0);
    numeroTarjeta.val("");
    correoPaypal.val("");
    FechaTarjeta.val("");
    quantityInput.val('1');
    cvv.val("");
    resumenDireccion.text("");
    resumenColonia.text("");
    resumenCiudad.text("");
    resumenCodigoPostal.text("");
    resumenMetodoPago.text("");
    resumenNumeroTarjeta.text("");
    resumenCorreoPaypal.text("");
    totalAPagar.text("");
}

btnAgregarAlCarrito.click(function (e) {
    ProductoActual = {};

    ProductoActual.ID = Articulo.id;
    ProductoActual.Nombre = Articulo.title;
    ProductoActual.Descripcion = Articulo.description;
    ProductoActual.Precio = Articulo.price;
    ProductoActual.Imagen = Articulo.image;
    ProductoActual.Rating = Articulo.rating;
    ProductoActual.Cantidad = quantityInput.val();
    ProductoActual.Talla = Talla;

    arrayCarrito.push(ProductoActual);
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    localStorage.setItem('carrito', JSON.stringify(arrayCarrito));   
});

// ******************* CANTIDAD ***********************
decreaseBtn.addEventListener("click", function () {
    if (quantityInput.val() > 1) {
        quantityInput.val(parseInt(quantityInput.val()) - 1);
    }
});

increaseBtn.addEventListener("click", function () {
    quantityInput.val(parseInt(quantityInput.val()) + 1);
});

function setRating(cantidad) {
    const stars = document.querySelectorAll('.rating > span');
    stars.forEach((star, index) => {
        const invertedIndex = stars.length - 1 - index;
        if (invertedIndex < cantidad) {
            star.style.color = 'red';
        } else {
            star.style.color = 'grey';
        }
    });
}

// ********************* CARRUSEL DE IMAGENES ******************
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const slideWidth = slides[0].clientWidth;

function goToSlide(index) {
    carousel.style.transform = `translateX(-${slideWidth * index}px)`;
    currentIndex = index;
}

function goToNextSlide() {
    if (currentIndex < slides.length - 1) {
        goToSlide(currentIndex + 1);
    } else {
        goToSlide(0);
    }
}

function goToPrevSlide() {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    } else {
        goToSlide(slides.length - 1);
    }
}

prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);
setInterval(goToNextSlide, 5000);

/* METODO DE PAGO */
function mostrarCamposPago() {
    var metodoPago = document.getElementById("metodoPago").value;
    var camposTarjeta = document.getElementById("camposTarjeta");
    var camposPaypal = document.getElementById("camposPaypal");

    if (metodoPago === "tarjeta") {
        camposTarjeta.style.display = "block";
        camposPaypal.style.display = "none";
    } else if (metodoPago === "paypal") {
        camposTarjeta.style.display = "none";
        camposPaypal.style.display = "block";
    }
}

/* ACTUALIZAR INFORMACION */
function actualizarResumen() {
    var direccion = document.getElementById("inputDireccion").value;
    var colonia = document.getElementById("inputColonia").value;
    var ciudad = document.getElementById("inputCiudad").value;
    var codigoPostal = document.getElementById("inputCodigoPostal").value;
    resumenDireccion.text(direccion);
    resumenColonia.text(colonia);
    resumenCiudad.text(ciudad);
    resumenCodigoPostal.text(codigoPostal);

    let metodoPago = $("#metodoPago").val();
    let numeroTarjeta = $("#numeroTarjeta").val();
    let correoPaypal = $("#correoPaypal").val();

    resumenMetodoPago.text(metodoPago);
    resumenNumeroTarjeta.text(numeroTarjeta);
    resumenCorreoPaypal.text(correoPaypal);

    let total = parseFloat(Articulo.price) * parseFloat(quantityInput.value);
    totalAPagar.text('$' + total);

}

inputDireccion.on("input", actualizarResumen);
inputColonia.on("input", actualizarResumen);
inputCiudad.on("input", actualizarResumen);
inputCodigoPostal.on("input", actualizarResumen);
metodoPago.on("change", actualizarResumen);
numeroTarjeta.on("input", actualizarResumen);
correoPaypal.on("input", actualizarResumen);

function mostrarNotificacionPersonalizada() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        html:
            '<div class="DivBtnCerrarToast"><button class="dismiss btn">x</button></div>'+
            '<div class="imagenToast"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="48" height="48"><g stroke="#34D399" stroke-linejoin="round" stroke-linecap="round" stroke-width="2"><path d="M20 7L9.00004 18L3.99994 13"></path></g></svg></div>' +
            '<div class="contenidoToast">' +
            '<p class="tituloToast">Orden realizada correctamente</p>' +
            '<p>Puedes recoger el pedido hoy antes de las 7 pm o será entregado mañana.</p>' +
            '<button class="btn btnPedidos" id="VerMisPedidos">Ver mis pedidos</button>' +
            '<button class="btn btnTracker" id="trackearEnvioBtn">Trackear mi envío</button>' +
            '</div>'
    });

    document.getElementById('trackearEnvioBtn').addEventListener('click', function () {
        console.log('Trackear envío');
    });
}