var arrayPedidosConfirmados = JSON.parse(localStorage.getItem('numeropedido')) || [];
var arrayImagenesPedido = JSON.parse(localStorage.getItem('imagenesPedido')) || [];
var divContenedorPedidos = document.getElementById('ContenedorPedidos');
var arrayObtieneNumeroPedido = {
    NumeroPedido: ""
};
$(document).ready(function () {
    CargaPedidos();
});

function CargaPedidos() {

    var pedidosHTML = '';
    var imagenesHTML = '';

    arrayImagenesPedido.forEach(function (producto) {
        console.log(producto);
        imagenesHTML += '<img style="width:20%;height:auto;" class="ImgPedido" src="' + producto + '"/>';
    });

    pedidosHTML = ` <div class="card TituloMisPedidos">
                    <h2>Mis pedidos</h2>
                    </div>`;

    arrayPedidosConfirmados.forEach(function (pedido) {
        pedidosHTML += `
        <div class="card shadow pedidos">
            <div class="row cuerpoPedidos">
                <div class="col-6 col-sm-6 col-md-4 DivImagenes">
                    <div class="contenedorImagenesPedidos">
                      ${imagenesHTML}
                    </div>
                </div>
                <div class="col-6 col-sm-6 col-md-3 InformacionPedido">
                    <p class="DatosDelPedido">
                        Número de Pedido: <span class="NumeroPedido"> #${pedido.NumeroPedido}</span>
                    </p>
                    <p class="DatosDelPedido">
                        Status: <span class="NumeroPedido"> Preparando envío</span>
                    </p>
                    <p class="DatosDelPedido">
                        Fecha del pedido: <span class="NumeroPedido"> ${pedido.Fecha}</span>
                    </p>
                    <p class="DatosDelPedido">
                        Total: <span class="NumeroPedido"> $${pedido.Total}</span>
                    </p>
                    <p class="DatosDelPedido">
                        La ventana de devolución se cerrará el <span class="NumeroPedido"> ${pedido.VentanaDevolucion}</span>
                    </p>
                    <p class="DatosDelPedido">
                        Enviar a <span class="NumeroPedido"> ${pedido.Nombre}</span>
                    </p>
                </div>
                <div class="col-6 col-sm-6 col-md-3 Comentario">
                <p>Escribir una opinión del pedido<p>
                <textarea class="form-control"></textarea>
                <p style="text-align:end"><button class="btn btn-outline-info">Enviar</button></p>
                </div>
                <div class="col-6 col-sm-6 col-md-2 botonesPedido">
                    <a class="btn btn-outline-success rounded-pill" id="btnDetallePedido" href="./DetallePedido">Ver detalle</a>
                    <a class="btn btn-outline-danger rounded-pill " href="http://tiendas-grand.com.mx/Facturacion">Facturar mi pedido</a>
                    <a class="btn btn-outline-primary rounded-pill" href="">Trackear mi envío</a>
                    <a class="btn btn-outline-warning rounded-pill" href="">Comprar nuevamente</a>
                </div>
            </div>
        </div>`;
    });
    divContenedorPedidos.innerHTML += pedidosHTML;
};

function ObtieneNumeroPedido() {
    arrayObtieneNumeroPedido.NumeroPedido = arrayPedidosConfirmados[0].NumeroPedido;

    $.ajax({
        type: "POST",
        url: "ObtieneNumeroPedido",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(arrayObtieneNumeroPedido),
        success: function (response) {
            if (response.ResponseCode === 1) {
                if (response.TransactionResponses[0].TransactionStatus === 1) {
                    var resultados = response.TransactionResponses[0].TransactionResults;

                    let txtUsuario = document.getElementById('txtUsuario');
                    txtUsuario.value = resultados[0].NombreUsuario;
                }
                else {
                    console.log("error ConsultaUsuario", response.TransactionResponses[0].TransactionMessage);
                    notify("error", "Tiendas Grand", "No se Encontraron Compradores");
                }
            }
            else {
                console.log("error ConsultaUsuario", response.ResponseMessage);
                notify("error", "Tiendas Grand", "Error de conexión");
            }
        },
        error: function () {

        }
    });
};