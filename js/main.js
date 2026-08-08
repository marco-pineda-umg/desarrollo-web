var modal = document.getElementById('modal');
var modalImagen = document.getElementById('modal-imagen');
var modalTitulo = document.getElementById('modal-titulo');
var cerrarBtn = document.getElementById('cerrar-modal');
var imagenes = document.querySelectorAll('.imagen-galeria');

imagenes.forEach(function(img) {
    img.addEventListener('click', function() {
        modalImagen.src = img.src;
        modalImagen.alt = img.alt;
        modalTitulo.textContent = img.dataset.titulo;
        modal.classList.remove('oculto');
    });
});

cerrarBtn.addEventListener('click', function() {
    modal.classList.add('oculto');
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.add('oculto');
    }
});

var buscador = document.getElementById('buscador');
var items = document.querySelectorAll('#lista-actividades li');

buscador.addEventListener('input', function() {
    var texto = buscador.value.toLowerCase();
    items.forEach(function(item) {
        if (item.textContent.toLowerCase().includes(texto)) {
            item.classList.remove('oculto');
        } else {
            item.classList.add('oculto');
        }
    });
});

document.getElementById('calcular').addEventListener('click', function() {
    var asistentes = parseInt(document.getElementById('asistentes').value);
    var paquete = parseInt(document.getElementById('paquete').value);
    var extra = 0;

    if (!asistentes || asistentes < 1) {
        document.getElementById('resultado-cotizacion').textContent = 'Ingresa un numero valido de asistentes.';
        return;
    }

    if (document.getElementById('transporte').checked) extra += 250;
    if (document.getElementById('alimentacion').checked) extra += 320;
    if (document.getElementById('equipo').checked) extra += 200;

    var total = asistentes * (paquete + extra);
    document.getElementById('resultado-cotizacion').textContent = 'Total estimado: Q' + total.toLocaleString('es-GT') + ' para ' + asistentes + ' persona(s).';
});

document.getElementById('reservar').addEventListener('click', function() {
    var nombre = document.getElementById('nombre').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var fecha = document.getElementById('fecha').value;
    var personas = document.getElementById('personas').value;
    var msg = document.getElementById('mensaje-reservacion');

    if (!nombre || !correo || !fecha || !personas) {
        msg.textContent = 'Por favor completa todos los campos antes de continuar.';
        msg.classList.remove('exito');
        msg.classList.add('error');
        return;
    }

    msg.textContent = '¡Gracias ' + nombre + ', tu solicitud para ' + personas + ' persona(s) ha sido registrada!';
    msg.classList.remove('error');
    msg.classList.add('exito');
});

var nombres = ['Ana Gomez', 'Carlos Lopez', 'Maria Fernandez', 'Luis Rodriguez', 'Sofia Martinez'];
var comentarios = [
    'Una experiencia increible, las cascadas son impresionantes y el paisaje es como un sueno.',
    'El valle de Lauterbrunnen es simplemente magico, lo recomendaria a cualquier viajero.',
    'El tour estuvo perfectamente organizado, cada detalle fue cuidado con esmero.',
    'Las vistas desde el teleferico son espectaculares, nunca olvidare este viaje.',
    'Un lugar que supera todas las expectativas, definitivamente regresare pronto.'
];

function mostrarResena() {
    var i = Math.floor(Math.random() * nombres.length);
    document.getElementById('resena-texto').textContent = '"' + comentarios[i] + '"';
    document.getElementById('resena-nombre').textContent = '— ' + nombres[i];
}

mostrarResena();

document.getElementById('nueva-resena').addEventListener('click', mostrarResena);
