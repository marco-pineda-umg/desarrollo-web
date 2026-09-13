import { useState } from 'react';

function Reservacion() {
    var [nombre, setNombre] = useState('');
    var [correo, setCorreo] = useState('');
    var [fecha, setFecha] = useState('');
    var [personas, setPersonas] = useState('1');
    var [mensaje, setMensaje] = useState({ texto: '', clase: '' });

    function reservar() {
        var nombreLimpio = nombre.trim();
        var correoLimpio = correo.trim();

        if (!nombreLimpio || !correoLimpio || !fecha || !personas) {
            setMensaje({ texto: 'Por favor completa todos los campos antes de continuar.', clase: 'error' });
            return;
        }

        if (Number(personas) < 0) {
            setMensaje({ texto: 'El numero de personas no puede ser negativo.', clase: 'error' });
            return;
        }

        setMensaje({ texto: '¡Gracias ' + nombreLimpio + ', tu solicitud para ' + personas + ' persona(s) ha sido registrada!', clase: 'exito' });
    }

    return (
        <section id="reservacion">
            <h2>Reservacion</h2>
            <form id="form-reservacion">
                <label>
                    Nombre completo
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Tu nombre"
                        value={nombre}
                        onChange={function(e) { setNombre(e.target.value); }}
                    />
                </label>
                <label>
                    Correo electronico
                    <input
                        type="email"
                        id="correo"
                        placeholder="tu@correo.com"
                        value={correo}
                        onChange={function(e) { setCorreo(e.target.value); }}
                    />
                </label>
                <label>
                    Fecha del viaje
                    <input
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={function(e) { setFecha(e.target.value); }}
                    />
                </label>
                <label>
                    Numero de personas
                    <input
                        type="number"
                        id="personas"
                        min="1"
                        value={personas}
                        onChange={function(e) { setPersonas(e.target.value); }}
                    />
                </label>
                <button type="button" id="reservar" className="boton" onClick={reservar}>Enviar reservacion</button>
                <p id="mensaje-reservacion" className={mensaje.clase}>{mensaje.texto}</p>
            </form>
        </section>
    );
}

export default Reservacion;
