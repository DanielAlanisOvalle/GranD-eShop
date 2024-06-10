var DetallePedido = document.getElementById('DetallePedido');
var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
var arrayPedido = [];
var UsuarioSesionActual = localStorage.getItem('Usuario');
var PedidoSeleccionado = localStorage.getItem('PedidoSeleccionado');
let DetallePedidosHTML = '';
let detalleNombre = $('#detalleNombre');
let detalleColonia = $('#detalleColonia');
let detalleCiudad = $('#detalleCiudad');
let detalleCodigoPostal = $('#detalleCodigoPostal');
let detalleMetodoPago = $('#detalleMetodoPago');
let totalAPagar = $('#totalAPagar');
let detalleFechaPedido = $('#detalleFechaPedido');
let TotalEnvío = $('#TotalEnvío');

$(document).ready(function () {
    DetallePedidos();
});

function DetallePedidos() {
    $.ajax({
        url: "DetallePedido",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(PedidoSeleccionado),
        success: function (data, textStatus, xhr) {
            arrayPedido = data.map(pedido => {
                return {
                    numeroPedido: pedido.numeroPedido,
                    fecha: pedido.fecha,
                    costoTotal: pedido.costoTotal,
                    costoUnitario: pedido.costoUnitario,
                    imagen: pedido.imagen,
                    cantidad: pedido.cantidad,
                    colonia: pedido.colonia,
                    ciudad: pedido.ciudad,
                    codigoPostal: pedido.codigoPostal,
                    Nombre: pedido.nombre + ' ' + pedido.apellidos,
                    metodoPago: pedido.metodoPago
                };
            });
            DibujarPedido();
        },
        error: function (xhr, textStatus, errorThrow) {
            console.log('error');
        }
    });
}

function DibujarPedido() {
    DetallePedido.innerHTML = '';
    arrayPedido.forEach(function (producto) {

        detalleNombre.text(arrayPedido[0].Nombre);
        detalleColonia.text(arrayPedido[0].colonia);
        detalleCiudad.text(arrayPedido[0].ciudad);
        detalleCodigoPostal.text(arrayPedido[0].codigoPostal);
        detalleMetodoPago.text(arrayPedido[0].metodoPago);
        totalAPagar.text('$' + arrayPedido[0].costoTotal);
        detalleFechaPedido.text(arrayPedido[0].fecha);

        DetallePedidosHTML += `
        <div class="col-md-3 col-sm-4 m-0 p-0 card shadow cardDetallePedido">
           <div class="card-header">
                <img class="img-fluid" src="${producto.imagen}" style="width: 100%;">
            </div>
            <div class="card-footer">
                $${producto.costoUnitario}<br/>
                Cantidad: ${producto.cantidad}
            </div>
        </div>
        `;
    });

    DetallePedido.innerHTML = DetallePedidosHTML;
}
