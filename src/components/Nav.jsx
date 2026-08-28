export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a id="" className="navbar-brand" href="#">
          Tiendarte
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#ofertas">
                ofertas
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#nuevo">
                nuevos
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#galeria">
                galeria
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#testimonios">
                testimonios
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
