// src/controllers/categoriaController.js
import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { crearCarrusel } from "../components/carruselComponent.js";

<<<<<<< HEAD
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

  // Función para crear una card interactiva a partir de un item
  function createCard(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-id", item.id);
    card.setAttribute("data-tipo", item.tipo);

    const img = document.createElement("img");
    img.src = item.image;
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

  // Función para crear el componente carrusel usando nuestro componente reutilizable
  function createCarouselComponent(genreTitle, cards) {
    return crearCarrusel(genreTitle, cards);
  }

  // Por cada género, obtenemos la data, creamos las cards y agregamos el carrusel al contenedor.
  for (const genre of genres) {
    const data = await getGenreData(genre);
    const cards = data.map(item => createCard(item));
    const carousel = createCarouselComponent(genre.title, cards);
    container.appendChild(carousel);
  }
}
=======
document.addEventListener("DOMContentLoaded", function () {
  const categorias = ["anime", "manga", "peliculas", "series"];
  const contenedor_index = document.getElementById("app");

  async function obtenerDatos(categoria) {
    try {
      let url, options = {};

      if (categoria === "anime") {
        url = "https://api.jikan.moe/v4/top/anime";
      } else if (categoria === "manga") {
        url = "https://api.jikan.moe/v4/top/manga";
      } else if (categoria === "peliculas") {
        url = "https://imdb236.p.rapidapi.com/imdb/top250-movies";
        options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
          }
        };
      } else if (categoria === "series") {
        url = "https://imdb236.p.rapidapi.com/imdb/top250-tv";
        options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
          }
        };
      } else {
        throw new Error("Categoría no válida");
      }

      const respuesta = await fetch(url, options);
      const data = await respuesta.json();

      if (!data.data && !Array.isArray(data)) {
        throw new Error("Los datos que se tratan de obtener son incorrectos.");
      }

      if (categoria === "anime" || categoria === "manga") {
        return data.data
          .filter(item => item.images?.webp?.image_url)
          .slice(0, 10)
          .map(item => ({
            title: item.title,
            image: item.images.webp.image_url
          }));
      } else {
        return data.slice(0, 10).map(item => ({
          title: item.primaryTitle,
          image: item.primaryImage.url
        }));
      }

    } catch (error) {
      console.error(`Error al obtener ${categoria}:`, error);
      return [];
    }
  }

  async function cargarIndex() {
    for (let categoria of categorias) {
      const items = await obtenerDatos(categoria);
      if (items.length === 0) continue;

      const separador = document.createElement("hr");

      const seccion = document.createElement("section");
      seccion.classList.add("section_categorias");

      const carrusel = crearCarrusel(categoria, items);

      contenedor_index.appendChild(separador);
      contenedor_index.appendChild(seccion);
      seccion.appendChild(carrusel);
    }
  }

  cargarIndex();
});
>>>>>>> 0849479e59ef1ef9becc56ea055b06d6e5054206
