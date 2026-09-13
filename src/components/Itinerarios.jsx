var itinerario = [
    { hora: '8:00 AM', actividad: 'Desayuno', lugar: 'Restaurante local', duracion: '1 hora' },
    { hora: '9:00 AM', actividad: 'Caminata por el pueblo', lugar: 'Pueblo de Lauterbrunnen', duracion: '1 hora' },
    { hora: '10:00 AM', actividad: 'Visita a la cascada Staubbach', lugar: 'Staubbachfall', duracion: '1 hora 30 minutos' },
    { hora: '11:30 AM', actividad: 'Recorrido por el valle', lugar: 'Valle de Lauterbrunnen', duracion: '2 horas' },
    { hora: '01:30 PM', actividad: 'Almuerzo', lugar: 'Restaurante local', duracion: '1 hora 30 minutos' },
    { hora: '03:00 PM', actividad: 'Visita a las cascadas de Trummelbach', lugar: 'Trummelbachfalle', duracion: '2 horas' },
    { hora: '05:00 PM', actividad: 'Tiempo libre y fotografias', lugar: 'Centro del pueblo', duracion: '1 hora' },
    { hora: '06:00 PM', actividad: 'Cena', lugar: 'Restaurante local', duracion: '1 hora' }
];

function Itinerarios() {
    return (
        <section id="itinerarios">
            <h2>Itinerarios</h2>
            <table border="1" cellSpacing="0" cellPadding="10">
                <thead>
                    <tr>
                        <th><strong>Hora</strong></th>
                        <th><strong>Actividad</strong></th>
                        <th><strong>Lugar</strong></th>
                        <th><strong>Duracion</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {itinerario.map(function(fila) {
                        return (
                            <tr key={fila.hora}>
                                <td>{fila.hora}</td>
                                <td>{fila.actividad}</td>
                                <td>{fila.lugar}</td>
                                <td>{fila.duracion}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
}

export default Itinerarios;
