import "dotenv/config";
import mongoose from "mongoose";
import Recurso from "./models/Recurso.js";

// Productos que mostraba la pagina antes de usar la base de datos
const productos = [
  {
    title: "Cuaderno",
    description: "cuaderno para dibujo",
    info: "Cuaderno de dibujo ideal para realizar bocetos, ilustraciones y prácticas artísticas. Sus hojas ofrecen una superficie cómoda para trabajar con lápices, carboncillo y otras técnicas secas, siendo una excelente opción tanto para estudiantes como para artistas.",
    price: 100,
    stock: 20,
    category: "Dibujo",
    image: "/item1.webp",
    section: "ofertas",
  },
  {
    title: "Pinturas",
    description: "acrilicos de calidad",
    info: "Set de pinturas acrílicas con colores intensos y buena cobertura, perfecto para desarrollar todo tipo de proyectos creativos. Pueden utilizarse sobre lienzo, papel, madera y otras superficies, permitiendo crear mezclas, detalles y acabados llenos de color.",
    price: 80,
    stock: 15,
    category: "Pintura",
    image: "/item2.webp",
    section: "ofertas",
  },
  {
    title: "Lapices",
    description: "lapices de sombreado",
    info: "Juego de lápices de sombreado diseñado para bocetos, retratos, ilustraciones y trabajos con distintos niveles de profundidad. Sus diferentes graduaciones permiten crear desde líneas suaves hasta sombras intensas y detalles precisos.",
    price: 150,
    stock: 25,
    category: "Dibujo",
    image: "/item3.webp",
    section: "ofertas",
  },
  {
    title: "Acuarelas",
    description: "acuarelas coloridas",
    info: "Set de acuarelas con una amplia variedad de tonos vivos y fáciles de combinar. Ideal para pintar paisajes, ilustraciones, lettering y proyectos artísticos, permitiendo obtener efectos transparentes, degradados y mezclas suaves con agua.",
    price: 125,
    stock: 12,
    category: "Pintura",
    image: "/item4.webp",
    section: "ofertas",
  },
  {
    title: "paletas acrilicas",
    description: "mezcla pinturas",
    info: "Paleta para pintura acrílica práctica y ligera, diseñada para mezclar colores cómodamente durante el proceso creativo. Su superficie permite combinar diferentes tonalidades y preparar las cantidades necesarias para cada ilustración o pintura.",
    price: 50,
    stock: 30,
    category: "Pintura",
    image: "/item5.webp",
    section: "nuevo",
  },
  {
    title: "Rapidografos",
    description: "lineas solidas",
    info: "Set de rapidógrafos de punta fina ideal para realizar líneas definidas, ilustraciones detalladas, dibujo técnico y lettering. Permiten trabajar con precisión en distintos tipos de proyectos, desde bocetos profesionales hasta diseños decorativos.",
    price: 85,
    stock: 18,
    category: "Dibujo",
    image: "/item6.webp",
    section: "nuevo",
  },
  {
    title: "Marcadores",
    description: "marcadores fuertes",
    info: "Marcadores acrílicos de colores intensos y gran versatilidad, ideales para ilustración, decoración, lettering y manualidades. Sus puntas permiten realizar trazos definidos y añadir detalles llamativos en diferentes superficies y proyectos creativos.",
    price: 200,
    stock: 10,
    category: "Ilustracion",
    image: "/item7.webp",
    section: "nuevo",
  },
  {
    title: "Arcilla",
    description: "seca al aire",
    info: "Arcilla blanca de secado al aire, fácil de moldear y adecuada para crear figuras, adornos, esculturas y proyectos escolares. No requiere horno para endurecerse, por lo que resulta práctica tanto para principiantes como para actividades artísticas y manualidades.",
    price: 155,
    stock: 14,
    category: "Modelado",
    image: "/item8.webp",
    section: "nuevo",
  },
];

await mongoose.connect(process.env.MONGODB_URI);

const total = await Recurso.countDocuments();
if (total > 0) {
  console.log("La base de datos ya tiene " + total + " productos, no se insertó nada");
} else {
  // Se insertan en orden inverso porque la lista se ordena por createdAt descendente
  for (const producto of [...productos].reverse()) {
    await Recurso.create(producto);
  }
  console.log(productos.length + " productos insertados");
}

await mongoose.disconnect();
