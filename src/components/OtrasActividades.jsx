import { useState } from 'react';

var actividades = [
    { nombre: 'Senderismo', descripcion: 'Recorrer los senderos del valle de Lauterbrunnen y disfrutar las montanas, los campos y las cascadas.' },
    { nombre: 'Visita a Murren', descripcion: 'Conocer el pequeno pueblo alpino de Murren, ubicado en las montanas y accesible mediante teleferico y tren.' },
    { nombre: 'Paseo en el teleferico', descripcion: 'Subir en el teleferico para observar una vista panoramica del valle y de las montanas de los Alpes suizos.' },
    { nombre: 'Ciclismo', descripcion: 'Alquilar una bicicleta y recorrer las rutas del valle, pasando por pueblos, cascadas y paisajes naturales.' },
    { nombre: 'Visita al Jungfraujoch', descripcion: 'Realizar una excursion en tren hacia Jungfraujoch, uno de los puntos turisticos mas famosos de Suiza.' },
    { nombre: 'Parapente', descripcion: 'Volar sobre el valle acompanado por un instructor y contemplar Lauterbrunnen desde el aire.' }
];

function OtrasActividades() {
    var [texto, setTexto] = useState('');

    return (
        <section id="otras-actividades">
            <h2>Otras actividades</h2>
            <input
                type="text"
                id="buscador"
                placeholder="Buscar actividad..."
                value={texto}
                onChange={function(e) { setTexto(e.target.value); }}
            />
            <ul id="lista-actividades">
                {actividades.map(function(item) {
                    var contenido = item.nombre + item.descripcion;
                    var visible = contenido.toLowerCase().includes(texto.toLowerCase());
                    return (
                        <li key={item.nombre} className={visible ? '' : 'oculto'}>
                            <strong>{item.nombre}</strong><br />{item.descripcion}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default OtrasActividades;
