import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Itemcard from "./components/Itemcard";
import Carousel from "./components/Carousel";
import { useEffect, useState } from "react";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import Account from "./components/Account";
import Productos from "./components/Productos";
import { Alert, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { api, onSessionExpired } from "./services/api";
import { useAuth } from "./context/AuthContext";
export default function App() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const page = useLocation().pathname;
  const [info, setInfo] = useState("");
  const [recursos, setRecursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ofertas = recursos.filter((recurso) => recurso.section === "ofertas");
  const nuevos = recursos.filter((recurso) => recurso.section === "nuevo");
  const isHome =
    page !== "/login" && page !== "/perfil" && page !== "/productos";

  useEffect(() => {
    onSessionExpired(() => {
      dispatch({ type: "LOGOUT" });
      navigate("/login", { state: { expired: true } });
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isHome) return;
    api("/recursos")
      .then((data) => {
        setRecursos(data.recursos);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isHome]);

  if (page === "/login" || page === "/perfil") {
    return (
      <>
        <Nav />
        <main id="app-container" className="container account-page">
          <Account />
        </main>
        <Footer />
      </>
    );
  }

  if (page === "/productos") {
    return (
      <>
        <Nav />
        <main id="app-container" className="container py-4">
          <Productos />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div id="app-container" className="container">
        <section id="hero" className="section-tienda hero">
          <Hero />
        </section>
        <section id="ofertas" className="section-block">
          <div className="section-title">
            <h1>Ofertas</h1>
            <div className="underline"></div>
          </div>
          {loading && <Spinner animation="border" variant="success" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {ofertas.map((recurso) => (
              <div className="col" key={recurso._id}>
                <Itemcard
                  image={recurso.image}
                  title={recurso.title}
                  description={recurso.description}
                  price={"Q" + recurso.price.toFixed(2)}
                  info={recurso.info}
                  onVerMas={setInfo}
                />
              </div>
            ))}
          </div>
          {!loading && !error && ofertas.length === 0 && (
            <p>No hay ofertas disponibles...</p>
          )}
        </section>

        <section id="nuevo" className="section-block">
          <div className="section-title">
            <h1>Nuevos productos</h1>
            <div className="underline"></div>
          </div>
          {loading && <Spinner animation="border" variant="success" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {nuevos.map((recurso) => (
              <div className="col" key={recurso._id}>
                <Itemcard
                  image={recurso.image}
                  title={recurso.title}
                  description={recurso.description}
                  price={"Q" + recurso.price.toFixed(2)}
                  info={recurso.info}
                  onVerMas={setInfo}
                />
              </div>
            ))}
          </div>
          {!loading && !error && nuevos.length === 0 && (
            <p>No hay productos de nuevo ingreso...</p>
          )}
        </section>

        <section id="galeria" className="section-block">
          <div className="section-title">
            <h1>Galeria</h1>
            <div className="underline"></div>
          </div>
          <Carousel />
        </section>

        <section id="testimonios" className="section-block">
          <div className="section-title">
            <h1>Testimonios</h1>
            <div className="underline"></div>
          </div>
          <div className="row row-cols-2">
            <div className="col">
              <Testimonial
                name={"Anna"}
                comment={
                  "Muy buenos materiales, perfectos para mi hobbie de pintura."
                }
                picture={"/testimonial1.webp"}
                time={"ayer"}
              />
            </div>
            <div className="col">
              <Testimonial
                name={"Carlita"}
                comment={
                  "Los mejores materiales de Guatemala. Recomendadisimos. 11/11 estrellas 😊"
                }
                picture={"/testimonial2.webp"}
                time={"ayer"}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <div
        className="modal fade"
        id="infoModal"
        tabIndex="-1"
        aria-labelledby="infoModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="infoModalLabel">
                Información
              </h5>
            </div>
            <div className="modal-body">
              <p>{info}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-item"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
