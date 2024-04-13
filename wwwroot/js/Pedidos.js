var arrayPedidosConfirmados = JSON.parse(localStorage.getItem('numeropedido')) || [];
var divContenedorPedidos = document.getElementById('ContenedorPedidos');
var arrayObtieneNumeroPedido = {
    NumeroPedido: ""
};
$(document).ready(function () {
    CargaPedidos();
});

function CargaPedidos() {
    var pedidosHTML = '';
    arrayPedidosConfirmados.forEach(function (pedido) {
        console.log(pedido);
        pedidosHTML += `<div class="row pedidos">
            <div class="TituloMisPedidos">
                    <h2>Mis pedidos</h2>
            </div>
            <div class="row cuerpoPedidos">
                <div class="col-9">
                        <p>
                           Número de Pedido: <span class="NumeroPedido"> #${pedido.NumeroPedido}</span>
                        </p>
                </div>
                <div class="col-3">
                    <a class="btn btn-outline-success" id="btnDetallePedido" href="./DetallePedido">Ver detalle</a>
                        <a class="btn btn-outline-danger" href="http://tiendas-grand.com.mx/Facturacion">
                        Facturar mi pedido
                        </a>                   
                </div>
                <div class="col-12 Aclaracion">
                     Tenga a la mano su número de pedido para cualquier aclaración, devolución o cancelación.
                <div>
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