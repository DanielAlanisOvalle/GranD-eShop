var DetallePedido = document.getElementById('DetallePedido');
var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
var DetallePedidosHTML = '';
var resumenNombre = $('#resumenNombre');
var resumenDireccion = $('#resumenDireccion');
var resumenColonia = $('#resumenColonia');
var resumenCiudad = $('#resumenCiudad');
var resumenCodigoPostal = $('#resumenCodigoPostal');
var resumenMetodoPago = $('#resumenMetodoPago');
var resumenNumeroTarjeta = $('#resumenNumeroTarjeta');
var resumenCorreoPaypal = $('#resumenCorreoPaypal');
var subTotalAPagar = $('#subTotalAPagar');
var CostoEnvio = $('#CostoEnvio');
var totalAPagar = $('#totalAPagar');

$(document).ready(function () {
    DetallePedidos();
});

function DetallePedidos() {
    let DetallePedidosHTML = '';

    arrayCarrito.forEach(function (producto) {
        DetallePedidosHTML += `
        <div class="col-md-2 col-sm-4 card shadow cardDetallePedido">
           <div class="card-header">
                <img src="${producto.Imagen}" alt="${producto.Nombre}" style="width: 100%;">
            </div>
            <div class="card-body">
                ${producto.Nombre}
            </div>
            <div class="card-footer">
                $${producto.Precio}<br/>
                Cantidad: ${producto.Cantidad}
            </div>
        </div>
        `;
    });

    DetallePedido.innerHTML = DetallePedidosHTML;
}
