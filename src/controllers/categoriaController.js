import { cargarItemsPorCategoria } from "../models/categoriaModel.js";
import { crearCarrusel } from "../components/carruselComponent.js";

document.addEventListener("DOMContentLoaded", async function () {
    const categorias = ["anime", "manga", "peliculas", "series"];
    const contenedor_index = document.getElementById("contenedor_index");

    // Función para obtener datos según la categoría
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
                    .filter(item => item.images.webp.image_url)
                    .slice(0, 6)
                    .map(item => ({
                        title: item.title,
                        image: item.images.webp.image_url
                    }));
            } else {
                return data.slice(0, 6).map(item => ({
                    title: item.primaryTitle,
                    image: item.primaryImage
                }));
            }

        } catch (error) {
            console.error(`Error al obtener ${categoria}:`, error);
            return [];
        }
    }

    // Función para cargar el contenido del índice
    async function cargarIndex() {
        for (let categoria of categorias) {
            const items = await obtenerDatos(categoria);
            const separador = document.createElement("hr");

            const tituloDiv = document.createElement("div");
            tituloDiv.classList.add("titulo_cards");
            tituloDiv.innerHTML = `<h1>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h1>`;

            const seccion = document.createElement("section");
            seccion.classList.add("section_categorias");

            // Usamos la función de carrusel para crear las cards
            const carrusel = crearCarrusel(categoria, items);

            seccion.appendChild(carrusel);
            contenedor_index.appendChild(separador);
            contenedor_index.appendChild(tituloDiv);
            contenedor_index.appendChild(seccion);
        }
    }

    // Llamar a la función que carga el carrusel
    cargarIndex();
});
