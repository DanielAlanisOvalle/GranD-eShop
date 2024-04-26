var DetallePedido = document.getElementById('DetallePedido');
var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
var arrayPedido = JSON.parse(localStorage.getItem('numeropedido')) || [];
var DetallePedidosHTML = '';

const detalleNombre = $('#detalleNombre');
const detalleColonia = $('#detalleColonia');
const detalleCiudad = $('#detalleCiudad');
const detalleCodigoPostal = $('#detalleCodigoPostal');
const detalleMetodoPago = $('#detalleMetodoPago');
const detalleNumeroTarjeta = $('#detalleNumeroTarjeta');
const detalleCorreoPaypal = $('#detalleCorreoPaypal');
const subTotalAPagar = $('#subTotalAPagar');
const CostoEnvio = $('#CostoEnvio');
const totalAPagar = $('#totalAPagar');

detalleNombre.text(arrayPedido[0].Nombre);
detalleColonia.text(arrayPedido[0].colonia);
detalleCiudad.text(arrayPedido[0].ciudad);
detalleCodigoPostal.text(arrayPedido[0].codigoPostal);
detalleMetodoPago.text(arrayPedido[0].metodoPago);
detalleNumeroTarjeta.text(arrayPedido[0].Tarjeta);
detalleCorreoPaypal.text(arrayPedido[0].Paypal);
subTotalAPagar.text(arrayPedido[0].subTotal);
CostoEnvio.text(arrayPedido[0].Envío);
totalAPagar.text(arrayPedido[0].Total);

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
