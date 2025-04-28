import { cargarItemsPorCategoria } from "../models/categoriaModel.js";
import { crearCarrusel } from "../components/carruselComponent.js";

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
