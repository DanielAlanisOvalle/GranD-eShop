document.addEventListener('DOMContentLoaded', () => {

});

const modalProductos = $('#modalProductos');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const quantityInput = document.getElementById('quantityInput');
let lblEntrega = $('#lblEntrega');
const btnAgregarAlCarrito = $('#btnAgregarAlCarrito');
let arrayCarrito = [];

let ProductoActual = {
    Nombre: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
    Rating: '',
    Cantidad: 0,
    Talla: ''
}
let Talla;
let Articulo;

function mostrarModalProducto(ID) {
    Articulo = productos.find(item => item.id == ID);
    document.getElementById('imgModal').setAttribute('src', Articulo.image);
    document.getElementById('lblTitleProducto').textContent = Articulo.title;
    document.getElementById('lblPrecio').textContent = '$' + Articulo.price;
    document.getElementById('lblDescripcion').textContent = Articulo.description;
    document.getElementById('lblRating').textContent = Articulo.rating.rate + ' (' + Articulo.rating.count + ')';

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
}

//******************** BOTONES ************************
const botonesTalla = document.getElementsByName('btnTalla');
botonesTalla.forEach(boton => {
    boton.addEventListener('click', function () {
        Talla = this.value;
    });
});

btnAgregarAlCarrito.click(function (e) {
    ProductoActual = {};

    ProductoActual.Nombre = Articulo.title;
    ProductoActual.Descripcion = Articulo.description;
    ProductoActual.Precio = Articulo.price;
    ProductoActual.Imagen = Articulo.image;
    ProductoActual.Rating = Articulo.rating;
    ProductoActual.Cantidad = quantityInput.value;
    ProductoActual.Talla = Talla;

    arrayCarrito.push(ProductoActual);
});

// ******************* CANTIDAD ***********************
decreaseBtn.addEventListener("click", function () {
    if (quantityInput.value > 1) {
        quantityInput.value--;
    }
});

increaseBtn.addEventListener("click", function () {
    quantityInput.value++;
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
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentIndex = 0;

function showSlide(index) {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

setInterval(nextSlide, 5000);