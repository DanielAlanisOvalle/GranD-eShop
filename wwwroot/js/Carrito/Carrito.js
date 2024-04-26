document.addEventListener("DOMContentLoaded", function () {
    var carritoDiv = document.getElementById('carrito');
    var totalAPagar = $('#totalAPagar');
    var subTotalAPagar = $('#subTotalAPagar');
    var arrayCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var Total = 0;
    var subTotal = 0;
    var CostoEnvio = $('#CostoEnvio');
    var Envío = 0;
    const btnRealizarPedido = $('#btnRealizarPedido');
    var arrayPedidos = [];
    var arrayImagenes = [];

    btnRealizarPedido.click(function () {
        var Pedidos = {};

        momentoActual = new Date();
        day = momentoActual.getDate();
        month = momentoActual.getMonth();
        year = momentoActual.getFullYear();
        hora = momentoActual.getHours();
        minuto = momentoActual.getMinutes();
        segundo = momentoActual.getSeconds();
        mesQueViene = momentoActual.getMonth() + 1;
        Pedidos.Total = Total;
        Pedidos.Nombre = resumenNombre.text();
        Pedidos.Fecha = day + "/" + month + "/" + year;
        Pedidos.NumeroPedido = year + "" + month + "" + day + "" + hora + "" + minuto + "" + segundo;
        Pedidos.VentanaDevolucion = day + "/" + mesQueViene + "/" + year;
        Pedidos.subTotal = subTotal;
        Pedidos.Envío = Envío;
        Pedidos.metodoPago = document.getElementById("resumenMetodoPago").textContent;
        Pedidos.Tarjeta = numeroTarjeta.val();
        Pedidos.Paypal = correoPaypal.val();
        Pedidos.colonia = inputColonia.val();
        Pedidos.ciudad = inputCiudad.val();
        Pedidos.codigoPostal = inputCodigoPostal.val();
        arrayPedidos.push(Pedidos);
        arrayPedidos.push(Pedidos);
        arrayPedidos.push(Pedidos);
        localStorage.setItem('numeropedido', JSON.stringify(arrayPedidos));

        arrayCarrito.forEach(function (producto, index) {
            arrayImagenes.push(producto.Imagen);
        });

        localStorage.setItem('imagenesPedido', JSON.stringify(arrayImagenes));

        mostrarNotificacionPersonalizada(Pedidos.NumeroPedido);
        arrayCarrito = [];
        subTotal = 0;
        Envío = 0;
        Total = 0;
        //localStorage.removeItem('carrito');
        actualizarCarrito();
    });

    function actualizarCarrito() {
        var carritoHTML = '';

        arrayCarrito.forEach(function (producto, index) {
            let tallaHTML = '';
            if (producto.Talla !== undefined) {
                tallaHTML = `<br/>Talla: ${producto.Talla}`;
            }

            carritoHTML += `
            <div class="card">
                <div class="row">
                    <div class="col-4 d-flex justify-content-center align-items-center CardImgCarrito">
                        <img src="${producto.Imagen}" alt="${producto.Nombre}" style="width: 30%;">
                    </div>
                    <div class="col-6 cardBodyCarrito">
                        <div class="card-body">
                            <h5 style="padding:0px; font-size:17px" class="card-title">${producto.Nombre}</h5>
                            <div class="row">
                                <div class="col-12">
                                    <label class="margen" style="color:green">Disponible</label>
                                    <select class="form-control cantidad margen" style="width:150px" data-precio="${producto.Precio}" data-index="${index}">
                                        <option value="0" selected hidden>Cantidad: ${producto.Cantidad}</option>
                                        <option value="1">Cantidad: 1</option>
                                        <option value="2">Cantidad: 2</option>
                                        <option value="3">Cantidad: 3</option>
                                        <option value="4">Cantidad: 4</option>
                                        <option value="5">Cantidad: 5</option>
                                        <option value="6">Cantidad: 6</option>
                                        <option value="7">Cantidad: 7</option>
                                        <option value="8">Cantidad: 8</option>
                                        <option value="9">Cantidad: 9</option>
                                        <option value="10">Cantidad: 10</option>
                                    </select>
                                    <input class="margen" type="checkbox"> Es un regalo
                                    </br><button class="btn btn-sm btn-danger eliminar margen" data-index="${index}">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center DatosProducto">
                        Precio: $${producto.Precio}
                        <br/>Cantidad: ${producto.Cantidad}
                        ${tallaHTML}
                    </div>
                </div>
            </div>
            `;
            subTotal += parseFloat(producto.Precio) * parseInt(producto.Cantidad);
        });

        if (subTotal >= 100) {
            Envío = 0;
            CostoEnvio.text('GRATIS');
            CostoEnvio.css('color', 'Green')
        }
        else if (subTotal == 0) {
            Envío = 0;
            CostoEnvio.text('$' + Envío);
        }
        else {
            Envío = 50;
            CostoEnvio.text('$' + Envío);
        }
        subTotalAPagar.text('$' + subTotal.toFixed(2));
        Total = subTotal + Envío;
        totalAPagar.text('$' + Total.toFixed(2));
        carritoDiv.innerHTML = carritoHTML;
    }

    actualizarCarrito();

    $(document).on('change', '.cantidad', function () {
        var indice = $(this).data('index');
        var nuevaCantidad = parseInt($(this).val());
        arrayCarrito[indice].Cantidad = nuevaCantidad;
        localStorage.setItem('carrito', JSON.stringify(arrayCarrito));
        subTotal = 0;
        actualizarCarrito();
    });

    $(document).on('click', '.eliminar', function () {
        var index = $(this).data('index');
        arrayCarrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(arrayCarrito));
        subTotal = 0;
        actualizarCarrito();
    });

    /* ACTUALIZAR INFORMACION */
    function actualizarResumen() {
        var direccion = document.getElementById("inputDireccion").value;
        var colonia = document.getElementById("inputColonia").value;
        var ciudad = document.getElementById("inputCiudad").value;
        var codigoPostal = document.getElementById("inputCodigoPostal").value;
        var nombre = document.getElementById("inputNombre").value;
        resumenDireccion.text(direccion);
        resumenColonia.text(colonia);
        resumenCiudad.text(ciudad);
        resumenCodigoPostal.text(codigoPostal);
        resumenNombre.text(nombre);

        let metodoPagoCarrito = $("#metodoPagoCarrito").val();
        let numeroTarjeta = $("#numeroTarjeta").val();
        let correoPaypal = $("#correoPaypal").val();

        resumenMetodoPago.text(metodoPagoCarrito);
        resumenNumeroTarjeta.text(numeroTarjeta);
        resumenCorreoPaypal.text(correoPaypal);
    }

    inputDireccion.on("input", actualizarResumen);
    inputColonia.on("input", actualizarResumen);
    inputNombre.on("input", actualizarResumen);
    inputCiudad.on("input", actualizarResumen);
    inputCodigoPostal.on("input", actualizarResumen);
    metodoPago.on("change", actualizarResumen);
    numeroTarjeta.on("input", actualizarResumen);
    correoPaypal.on("input", actualizarResumen);
});

/* METODO DE PAGO */
function mostrarCamposPagoCarrito() {
    var metodoPagoCarrito = $("#metodoPagoCarrito");

    var camposTarjetaCarrito = $("#camposTarjetaCarrito");
    var camposPaypalCarrito = $("#camposPaypalCarrito");

    if (metodoPagoCarrito.val() === "tarjeta") {
        camposTarjetaCarrito.css('display', 'block');
        camposPaypalCarrito.css('display', 'none');
    } else if (metodoPagoCarrito.val() === "paypal") {
        camposTarjetaCarrito.css('display', 'none');
        camposPaypalCarrito.css('display', 'block');
    }
}