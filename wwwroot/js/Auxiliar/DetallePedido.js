var DetallePedido = document.getElementById('DetallePedido');
var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
var DetallePedidosHTML = '';

$(document).ready(function () {
    DetallePedidos();
});

function DetallePedidos() {
    let DetallePedidosHTML = '';

    arrayCarrito.forEach(function (producto, index) {
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
