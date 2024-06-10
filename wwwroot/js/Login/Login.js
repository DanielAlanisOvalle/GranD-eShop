$(document).ready(function () {

});

let inpUsuario = $('#inpUsuario');
let inpNombre = $('#inpNombre');
const toastEl = document.querySelector('.toast');
let inpApellido = $('#inpApellido');
let inpEmail = $('#inpEmail');
let inpPassword = $('#inpPassword');
let btnCrearCuenta = $('#btnCrearCuenta');

var objCrearCuenta = new Object();

function LimpiarInputs() {
    inpUsuario.val('');
    inpNombre.val('');
    inpApellido.val('');
    inpEmail.val('');
    inpPassword.val('');
    btnCrearCuenta.val('');
}

btnCrearCuenta.on('click', () => {
    CrearCuenta();
});

$(document).ready(function () {
    $('#btnCrearCuenta').click(function () {
        CrearCuenta();
    });
});

function CrearCuenta() {
    var objCrearCuenta = {
        Nombre: $('#inpNombre').val(),
        Apellidos: $('#inpApellido').val(),
        Email: $('#inpEmail').val(),
        Contraseña: $('#inpPassword').val(),
        Usuario: $('#inpUsuario').val()
    };

    $.ajax({
        url: "../Login/CrearCuenta",
        type: 'POST',
        dataType: 'json',
        data: objCrearCuenta,
        success: function (data, textStatus, xhr) {
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(function () {
                window.location.href = '../Login/IniciarSesion';
            }, 2000);

            LimpiarInputs();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            LimpiarInputs();
        }
    });
}

function LimpiarInputs() {
    $('#inpNombre').val('');
    $('#inpApellido').val('');
    $('#inpEmail').val('');
    $('#inpPassword').val('');
    $('#inpUsuario').val('');
}

