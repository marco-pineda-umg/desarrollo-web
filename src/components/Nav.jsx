import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { state, dispatch } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a id="" className="navbar-brand" href="/">
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
          <ul className="navbar-nav ms-auto flex-wrap">
            <li className="nav-item active">
              <a className="nav-link" href="/#ofertas">
                ofertas
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/#nuevo">
                nuevos
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/#galeria">
                galeria
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/#testimonios">
                testimonios
              </a>
            </li>
            {state.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span
                    className="navbar-text navbar-user"
                    title={state.user.name}
                  >
                    {state.user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    productos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">
                    Mi perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-item"
                    onClick={() => dispatch({ type: "LOGOUT" })}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Iniciar Sesión
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
