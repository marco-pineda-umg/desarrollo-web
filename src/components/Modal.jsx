function Modal({ imagen, cerrar }) {
    function clickFondo(e) {
        if (e.target === e.currentTarget) {
            cerrar();
        }
    }

    return (
        <div id="modal" className={imagen ? 'modal' : 'modal oculto'} onClick={clickFondo}>
            <div className="modal-contenido">
                <button id="cerrar-modal" onClick={cerrar}>&#x2715;</button>
                <img id="modal-imagen" src={imagen ? imagen.src : ''} alt={imagen ? imagen.alt : ''} />
                <p id="modal-titulo">{imagen ? imagen.titulo : ''}</p>
            </div>
        </div>
    );
}

export default Modal;
