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
    // Primero buscamos en el mapeo de manga; si no existe, buscamos en additionalGenres.
    id = genreMapManga[genero] || (additionalGenres[genero] && additionalGenres[genero].mal_id);  }
  if (!id) {
    console.error("Género no reconocido:", genero, tipo);
    return;
  }


  //Aquí hice cambios
  const data = await obtenerDatosPorGenero(id, tipo);
  const container = document.createElement("div");  container.classList.add("album_cards");
  container.id = "categoria-content";
  container.classList.add("album_cards");
  container.innerHTML = "";


  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card_item");

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.setAttribute("loading", "lazy");

    const title = document.createElement("h3");
    title.textContent = item.title;

    card.appendChild(img);
    card.appendChild(title);
    container.appendChild(card);
  });

  // Asumiendo que en tu template de categoria.html haya un <main>
  document.querySelector("main").appendChild(container);
}
