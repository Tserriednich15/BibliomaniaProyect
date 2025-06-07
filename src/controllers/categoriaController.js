import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { genreMapAnime, genreMapManga, additionalGenres } from "../utils/genreMap.js";

export async function initCategoriasController() {
  const query = new URLSearchParams(window.location.search);
  const genero = query.get("genero");
  const tipo = query.get("tipo");

  let id;
  if (tipo === "anime") {
    id = genreMapAnime[genero];
  } else if (tipo === "manga") {
    id = genreMapManga[genero] || (additionalGenres[genero] && additionalGenres[genero].mal_id);
  }
  if (!id) {
    console.error("Género no reconocido:", genero, tipo);
    return;
  }

  const data = await obtenerDatosPorGenero(id, tipo);

  // Creamos el contenedor para la galería
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");

  data.forEach(item => {
    // Creamos la card con la estructura requerida para la vista de categoría
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.setAttribute("src", item.image);
    img.setAttribute("alt", item.title);
    img.setAttribute("loading", "lazy");

    // Contenedor para el contenido de la tarjeta
    const contenido = document.createElement("div");
    contenido.classList.add("card_contenido");

    // Creamos un h1 para el título
    const h1 = document.createElement("h1");
    h1.classList.add("section_categorias");
    h1.textContent = item.title;

    // Armamos la estructura de la card
    contenido.appendChild(h1);
    card.appendChild(img);
    card.appendChild(contenido);

    // Agregamos el event listener para redirigir a lectura.html
    card.addEventListener("click", () => {
      window.location.href = `lectura.html?tipo=${item.tipo}&id=${item.id}`;
    });

    gallery.appendChild(card);
  });

  // Seleccionamos el contenedor principal de contenido (por ejemplo, <main class="content">)
  const mainContent = document.querySelector("main.content");
  if (mainContent) {
    mainContent.appendChild(gallery);
  } else {
    console.error("No se encontró el contenedor main.content");
  }
}