
import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { crearCarrusel } from "../components/carruselComponent.js";
export default async function initCategoriasController() {
  const genres = [
    { key: "shonen", id: 27, title: "Shonen" },
    { key: "seinen", id: 37, title: "Seinen" },
    { key: "shojo", id: 26, title: "Shojo" },
    { key: "isekai", id: 142, title: "Isekai" },
    { key: "mecha", id: 18, title: "Mecha" }
  ];

  const container = document.getElementById("contenedor_index");
  if (!container) {
    console.error("No se encontró el contenedor_index");
    return;
  }

  // Función para obtener datos de un género dado
  async function getGenreData(genre) {
    return await obtenerDatosPorGenero(genre.id);
  }

  // Función para crear una card a partir de un item
  function createCard(item) {
    const card = document.createElement("div");
    card.className = "card_item";
    card.setAttribute("data-id", item.id);
    card.setAttribute("data-tipo", item.tipo);

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;

    const overlay = document.createElement("div");
    overlay.classList.add("card_overlay");

    const title = document.createElement("h3");
    title.textContent = item.title || "Sin título";

    overlay.appendChild(title);
    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener("click", () => {
      window.location.href = `lectura.html?tipo=${item.tipo}&id=${item.id}`;
    });

    return card;
  }

  // Recorre cada género y agrega el carrusel al contenedor
  for (const genre of genres) {
    const data = await getGenreData(genre);
    const cards = data.map(item => createCard(item));
    const carousel = crearCarrusel(genre.title, cards);
    container.appendChild(carousel);
  }
}