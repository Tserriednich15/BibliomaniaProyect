
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

  async function getGenreData(genre) {
    return await obtenerDatosPorGenero(genre.id);
  }

  function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", item.id);
    card.setAttribute("data-tipo", item.tipo);

    const img = document.createElement("img");
    img.src = item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s";
    img.alt = item.title;

    const title = document.createElement("h3");
    title.textContent = item.title;

    card.appendChild(img);
    card.appendChild(title);

    card.addEventListener("click", () => {
      window.location.href = `lectura.html?tipo=${item.tipo}&id=${item.id}`;
    });

    return card;
  }

  for (const genre of genres) {
    const data = await getGenreData(genre);
    const cards = data.map(item => createCard(item));
    const carousel = crearCarrusel(genre.title, cards);
    container.appendChild(carousel);
  }
}