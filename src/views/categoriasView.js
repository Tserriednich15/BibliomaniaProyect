// src/views/categoriasView.js
import { obtenerDatos } from "../utils/obtenerDatos.js";

const categoriasView = async () => {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");

  if (!tipo || !["anime", "manga", "peliculas", "series"].includes(tipo)) {
    const errorSection = document.createElement("section");
    errorSection.classList.add("error");

    const h2 = document.createElement("h2");
    h2.textContent = "❌ Categoría no válida";
    errorSection.appendChild(h2);

    const p = document.createElement("p");
    p.textContent = "La categoría proporcionada no existe o es incorrecta. Intenta con otra.";
    errorSection.appendChild(p);

    return errorSection;
  }

  const section = document.createElement("section");
  section.classList.add("categoria");

  const h2 = document.createElement("h2");
  h2.textContent = `Estás viendo la categoría: ${tipo?.toUpperCase() || "Desconocida"}`;
  section.appendChild(h2);

  const descripcion = document.createElement("p");

  switch (tipo) {
    case "anime":
      descripcion.textContent = "Aquí encontrarás los mejores animes recomendados.";
      break;
    case "peliculas":
      descripcion.textContent = "Disfruta de una selección de películas imperdibles.";
      break;
    case "series":
      descripcion.textContent = "Las series más populares están aquí.";
      break;
    case "manga":
      descripcion.textContent = "Sumérgete en el mundo de los mangas.";
      break;
    default:
      descripcion.textContent = "Categoría no encontrada.";
  }

  section.appendChild(descripcion);

  // 🔥 Obtener datos de la API
  const galeria = document.createElement("div");
  galeria.classList.add("gallery");

  const items = await obtenerDatos(tipo);

  items.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;

    const contenido = document.createElement("div");
    contenido.classList.add("card_contenido");

    const titulo = document.createElement("h1");
    titulo.textContent = item.title;

    contenido.appendChild(titulo);
    card.appendChild(img);
    card.appendChild(contenido);
    galeria.appendChild(card);
  });

  section.appendChild(galeria);
  return section;
};

export default categoriasView;