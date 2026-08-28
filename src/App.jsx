import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Itemcard from "./components/Itemcard";
import Carousel from "./components/Carousel";
import { useState } from "react";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
export default function App() {
  const [info, setInfo] = useState("");

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
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            <div className="col">
              {" "}
              <Itemcard
                image="/item1.webp"
                title="Cuaderno"
                description="cuaderno para dibujo"
                price="Q100.00"
                info="Cuaderno de dibujo ideal para realizar bocetos, ilustraciones y prácticas artísticas. Sus hojas ofrecen una superficie cómoda para trabajar con lápices, carboncillo y otras técnicas secas, siendo una excelente opción tanto para estudiantes como para artistas."
                onVerMas={setInfo}
              />
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item2.webp"
                title="Pinturas"
                description="acrilicos de calidad"
                price="Q80.00"
                info="Set de pinturas acrílicas con colores intensos y buena cobertura, perfecto para desarrollar todo tipo de proyectos creativos. Pueden utilizarse sobre lienzo, papel, madera y otras superficies, permitiendo crear mezclas, detalles y acabados llenos de color."
                onVerMas={setInfo}
              />{" "}
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item3.webp"
                title="Lapices"
                description="lapices de sombreado"
                price="Q150.00"
                info="Juego de lápices de sombreado diseñado para bocetos, retratos, ilustraciones y trabajos con distintos niveles de profundidad. Sus diferentes graduaciones permiten crear desde líneas suaves hasta sombras intensas y detalles precisos."
                onVerMas={setInfo}
              />
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item4.webp"
                title="Acuarelas"
                description="acuarelas coloridas"
                price="Q125.00"
                info="Set de acuarelas con una amplia variedad de tonos vivos y fáciles de combinar. Ideal para pintar paisajes, ilustraciones, lettering y proyectos artísticos, permitiendo obtener efectos transparentes, degradados y mezclas suaves con agua."
                onVerMas={setInfo}
              />
            </div>
          </div>
        </section>

        <section id="nuevo" className="section-block">
          <div className="section-title">
            <h1>Nuevos productos</h1>
            <div className="underline"></div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            <div className="col">
              {" "}
              <Itemcard
                image="/item5.webp"
                title="paletas acrilicas"
                description="mezcla pinturas"
                price="Q50.00"
                info="Paleta para pintura acrílica práctica y ligera, diseñada para mezclar colores cómodamente durante el proceso creativo. Su superficie permite combinar diferentes tonalidades y preparar las cantidades necesarias para cada ilustración o pintura."
                onVerMas={setInfo}
              />
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item6.webp"
                title="Rapidografos"
                description="lineas solidas"
                price="Q85.00"
                info="Set de rapidógrafos de punta fina ideal para realizar líneas definidas, ilustraciones detalladas, dibujo técnico y lettering. Permiten trabajar con precisión en distintos tipos de proyectos, desde bocetos profesionales hasta diseños decorativos."
                onVerMas={setInfo}
              />
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item7.webp"
                title="Marcadores"
                description="marcadores fuertes"
                price="Q200.00"
                info="Marcadores acrílicos de colores intensos y gran versatilidad, ideales para ilustración, decoración, lettering y manualidades. Sus puntas permiten realizar trazos definidos y añadir detalles llamativos en diferentes superficies y proyectos creativos."
                onVerMas={setInfo}
              />
            </div>
            <div className="col">
              {" "}
              <Itemcard
                image="/item8.webp"
                title="Arcilla"
                description="seca al aire"
                price="Q155.00"
                info="Arcilla blanca de secado al aire, fácil de moldear y adecuada para crear figuras, adornos, esculturas y proyectos escolares. No requiere horno para endurecerse, por lo que resulta práctica tanto para principiantes como para actividades artísticas y manualidades."
                onVerMas={setInfo}
              />
            </div>
          </div>
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
