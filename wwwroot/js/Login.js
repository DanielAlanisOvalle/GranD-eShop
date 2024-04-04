$(document).ready(function () {
    $('input[type="radio"]').click(function () {
        if ($(this).attr('id') == 'check') {
            $('#content').show();
            $('#content2').hide(); // Oculta el contenido2 si se selecciona el botón check
        }
        else if ($(this).attr('id') == 'check1') {
            $('#content2').show();
            $('#content').hide(); // Oculta el contenido si se selecciona el botón check1
        }
    });
});