var arrayPedidosConfirmados = JSON.parse(localStorage.getItem('numeropedido')) || [];
var arrayImagenesPedido = JSON.parse(localStorage.getItem('imagenesPedido')) || [];
var divContenedorPedidos = document.getElementById('ContenedorPedidos');

$(document).ready(function () {
    ObtenerPedidos();
});

function obtenerImagenesPedido(numeroPedido) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "ObtenerImagenesPedido",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(numeroPedido),
            success: function (data, textStatus, xhr) {
                resolve(data);
            },
            error: function (xhr, textStatus, errorThrow) {
                console.log('error');
                reject(errorThrow);
            }
        });
    });
}

function PedidoSeleccionado(pedido) {
    localStorage.setItem('PedidoSeleccionado', pedido);
}

function CargaPedidos() {
    var pedidosHTML = `
        <div class="card TituloMisPedidos">
            <h2>Mis pedidos</h2>
        </div>`;

    var promesasImagenes = arrayPedidosConfirmados.map(pedido => {
        return obtenerImagenesPedido(pedido.numeroPedido).then(imagenes => {
            var imagenesHTML = '';
            imagenes.forEach(function (img) {
                imagenesHTML += '<img class="img-fluid" src="' + img.imagen + '"/>';
            });

            return `
                <div class="card shadow pedidos">
                    <div class="row cuerpoPedidos">
                        <div class="col-6 col-sm-6 col-md-3 DivImagenes">
                            <div class="contenedorImagenesPedidos">
                                ${imagenesHTML}
                            </div>
                        </div>
                        <div class="col-6 col-sm-6 col-md-3 InformacionPedido">
                            <p class="DatosDelPedido">
                                Número de pedido: <span class="NumeroPedido"> #${pedido.numeroPedido}</span>
                            </p>
                            <p class="DatosDelPedido">
                                Status: <span class="NumeroPedido"> Preparando envío</span>
                            </p>
                            <p class="DatosDelPedido">
                                Fecha del pedido: <span class="NumeroPedido"> ${pedido.fecha}</span>
                            </p>
                            <p class="DatosDelPedido">
                                Total: <span class="NumeroPedido"> $${pedido.costoTotalPedido}</span>
                            </p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-3 Comentario">
                            <p>Escribir una opinión del pedido<p>
                            <textarea class="form-control"></textarea>
                            <p style="text-align:end"><button class="btn btn-outline-info">Enviar</button></p>
                        </div>
                        <div class="col-6 col-sm-6 col-md-3 botonesPedido">
                            <a class="btn btn-outline-success rounded-pill" onclick="PedidoSeleccionado(${pedido.numeroPedido})" id="btnDetallePedido" href="./DetallePedido">Ver detalle</a>
                            <a class="btn btn-outline-danger rounded-pill" href="http://tiendas-grand.com.mx/Facturacion">Facturar mi pedido</a>
                            <a class="btn btn-outline-primary rounded-pill" href="">Trackear mi envío</a>
                            <a class="btn btn-outline-warning rounded-pill" href="">Comprar nuevamente</a>
                        </div>
                    </div>
                </div>`;
        });
    });

    Promise.all(promesasImagenes).then(pedidosHTMLArray => {
        pedidosHTML += pedidosHTMLArray.join('');
        divContenedorPedidos.innerHTML = pedidosHTML;
    }).catch(error => {
        console.log('Error al cargar imágenes de pedidos:', error);
    });
}

var Usuario = localStorage.getItem('Usuario').toString();

function ObtenerPedidos() {
    $.ajax({
        url: "ObtenerPedidos",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Usuario),
        success: function (data, textStatus, xhr) {
            arrayPedidosConfirmados = data.map(pedido => {
                return {
                    numeroPedido: pedido.numeroPedido,
                    fecha: pedido.fecha,
                    costoTotalPedido: pedido.costoTotalPedido
                };
            });

            CargaPedidos();
            console.log(arrayPedidosConfirmados);
        },
        error: function (xhr, textStatus, errorThrow) {
            console.log('error');
        }
    });
}
