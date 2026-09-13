import { useState } from 'react';
import Modal from './components/Modal.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Descripcion from './components/Descripcion.jsx';
import Galeria from './components/Galeria.jsx';
import Itinerarios from './components/Itinerarios.jsx';
import OtrasActividades from './components/OtrasActividades.jsx';
import Cotizacion from './components/Cotizacion.jsx';
import Reservacion from './components/Reservacion.jsx';
import Resenas from './components/Resenas.jsx';
import Footer from './components/Footer.jsx';

function App() {
    var [imagenModal, setImagenModal] = useState(null);

    function abrirModal(imagen) {
        setImagenModal(imagen);
    }

    function cerrarModal() {
        setImagenModal(null);
    }

    return (
        <>
            <Modal imagen={imagenModal} cerrar={cerrarModal} />
            <Nav />
            <Hero />
            <main>
                <Descripcion />
                <Galeria abrir={abrirModal} />
                <Itinerarios />
                <OtrasActividades />
                <Cotizacion />
                <Reservacion />
                <Resenas />
            </main>
            <Footer />
        </>
    );
}

export default App;
