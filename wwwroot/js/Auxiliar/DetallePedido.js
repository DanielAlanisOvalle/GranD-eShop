var DetallePedido = document.getElementById('DetallePedido');
var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
var DetallePedidosHTML = '';
$(document).ready(function () {
    DetallePedidos();
});
function DetallePedidos() {
    arrayCarrito.forEach(function (producto) {
        DetallePedidosHTML += `
            <div class="card">
                <div class="row">
                    <div class="col-4 d-flex justify-content-center align-items-center CardImgCarrito">
                        <img src="${producto.Imagen}" alt="${producto.Nombre}" style="width: 40%;">
                    </div>
                    <div class="col-8 cardBodyCarrito">
                        <div class="card-body">
                            <h5 style="padding:0px; font-size:17px" class="card-title">${producto.Nombre}</h5>
                            Precio: $${producto.Precio}
                            <br/>Cantidad: ${producto.Cantidad}
                        </div>
                    </div>
                </div>
            </div>
            `
    });
    DetallePedido.innerHTML = DetallePedidosHTML;
};