var imagenes = [
    { src: '/images/landscape1.jpg', alt: 'Vista panoramica del valle', titulo: 'Vista panoramica del valle de Lauterbrunnen' },
    { src: '/images/landscape2.jpg', alt: 'Cascada Staubbach', titulo: 'Cascada Staubbach al atardecer' },
    { src: '/images/landscape3.jpg', alt: 'Pueblo alpino de Murren', titulo: 'Pueblo alpino de Murren' },
    { src: '/images/landscape4.jpg', alt: 'Senderos entre cascadas', titulo: 'Senderos entre cascadas del valle' }
];

function Galeria({ abrir }) {
    return (
        <section id="galeria">
            <h2>Galeria</h2>
            <p className="galeria-aviso">Haz clic en cualquier imagen para verla en detalle.</p>
            <div id="container-gallery">
                <table>
                    <tbody>
                        <tr>
                            {imagenes.map(function(img) {
                                return (
                                    <td key={img.src}>
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="imagen-galeria"
                                            data-titulo={img.titulo}
                                            onClick={function() { abrir(img); }}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Galeria;
