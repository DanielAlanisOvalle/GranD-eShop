$(document).ready(function () {
    
});

let InpUsuario = $('#InpUsuario');
let inpPassword = $('#inpPassword');
var ObjInicioSesion = new Object();
let btnIniciarSesion = $('#btnIniciarSesion');
var UsuarioActual;

function LimpiarInputs() {
    InpUsuario.val('');
    inpPassword.val('');
}

btnIniciarSesion.on('click', () => {
    InicioSesion();
});

function InicioSesion() {
    ObjInicioSesion.User = InpUsuario.val();
    ObjInicioSesion.Contraseña = inpPassword.val();

    $.ajax({
        url: "MetIniciarSesion",
        type: 'GET',
        dataType: 'json',
        data: ObjInicioSesion,
        success: function (data, textStatus, xhr) {
            console.log(data);
            if (data.exito == true) {
                UsuarioActual = data.mensaje;
                localStorage.setItem('Usuario', UsuarioActual);
                window.location.href = '../Inicio/Productos';
            }
            LimpiarInputs();
            
        },
        error: function (xhr, textStatus, errorThrow) {
            console.log('error');
            LimpiarInputs();
        }
    });
}