import { useState } from 'react';

var nombres = ['Ana Gomez', 'Carlos Lopez', 'Maria Fernandez', 'Luis Rodriguez', 'Sofia Martinez'];
var comentarios = [
    'Una experiencia increible, las cascadas son impresionantes y el paisaje es como un sueno.',
    'El valle de Lauterbrunnen es simplemente magico, lo recomendaria a cualquier viajero.',
    'El tour estuvo perfectamente organizado, cada detalle fue cuidado con esmero.',
    'Las vistas desde el teleferico son espectaculares, nunca olvidare este viaje.',
    'Un lugar que supera todas las expectativas, definitivamente regresare pronto.'
];

function indiceAleatorio() {
    return Math.floor(Math.random() * nombres.length);
}

function Resenas() {
    var [indice, setIndice] = useState(indiceAleatorio);

    function mostrarResena() {
        setIndice(indiceAleatorio());
    }

    return (
        <section id="resenas">
            <h2>Opiniones de nuestros visitantes</h2>
            <div id="tarjeta-resena">
                <p id="resena-texto">{'"' + comentarios[indice] + '"'}</p>
                <p id="resena-nombre">{'— ' + nombres[indice]}</p>
            </div>
            <button id="nueva-resena" className="boton" onClick={mostrarResena}>Ver otra opinion</button>
        </section>
    );
}

export default Resenas;
