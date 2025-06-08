import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { crearCarrusel } from "./carruselComponent.js";
import { genreMapAnime, genreMapManga, additionalGenres } from "../utils/genreMap.js";

export const crearMain = async () => {
  const main = document.createElement("main");
  main.classList.add("content");

  // Indicador de carga
  const loadingIndicator = document.createElement("p");
  loadingIndicator.textContent = "Cargando contenido...";
  loadingIndicator.classList.add("loader");
  main.appendChild(loadingIndicator);

  // --- GALERÍA DE CATEGORÍAS ---
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");
  main.appendChild(gallery);  // Lo agregamos antes de cargar los datos

  // Construir el array de categorías para la galería.
  const categoriasAnime = Object.entries(genreMapAnime).map(([key, id]) => ({
    key,
    id,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    tipo: "anime",
  }));

  const categoriasManga = Object.entries(genreMapManga).map(([key, id]) => {
    const parts = key.split("-");
    return {
      key,
      id,
      title: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
      tipo: "manga",
    };
  });

  const categorias = [...categoriasAnime, ...categoriasManga];

  async function cargarCategorias() {
    for (const cat of categorias) {
      try {
        const data = await obtenerDatosPorGenero(cat.id, cat.tipo);
        const representative = data.length > 0
          ? data[0]
          : {
              title: cat.title,
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s",
            };

        const link = document.createElement("a");
        link.setAttribute("href", `categoria.html?genero=${cat.key}&tipo=${cat.tipo}`);

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.setAttribute("src", representative.image);
        img.setAttribute("alt", representative.title);
        img.setAttribute("loading", "lazy");

        const contenido = document.createElement("div");
        contenido.classList.add("card_contenido");

        const h1 = document.createElement("h1");
        h1.classList.add("section_categorias");
        h1.textContent = cat.title;

        contenido.appendChild(h1);
        card.appendChild(img);
        card.appendChild(contenido);
        link.appendChild(card);
        gallery.appendChild(link);  // Se agrega cada card en cuanto está lista

      } catch (error) {
        console.error("Error al cargar datos para la categoría:", cat, error);
      }
    }
  }

  await cargarCategorias();

  // Eliminamos el indicador de carga al completar la carga de categorías
  main.removeChild(loadingIndicator);

  // --- NUEVOS CARRUSELES ADICIONALES ---
  const nuevosTemas = Object.entries(additionalGenres).map(([key, genre]) => ({
    key,
    id: genre.mal_id,
    title: genre.name,
    tipo: "manga",
  }));

  for (let tema of nuevosTemas) {
    try {
      const data = await obtenerDatosPorGenero(tema.id, tema.tipo);
      const cards = data.map((item) => {
        const link = document.createElement("a");
        link.setAttribute("href", `categoria.html?genero=${tema.key}&tipo=${tema.tipo}`);
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.setAttribute("src", item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s");
        img.setAttribute("alt", item.title);
        img.setAttribute("loading", "lazy");

        const contenido = document.createElement("div");
        contenido.classList.add("card_contenido");

        const h1 = document.createElement("h1");
        h1.classList.add("section_categorias");
        h1.textContent = item.title || tema.title;

        contenido.appendChild(h1);
        card.appendChild(img);
        card.appendChild(contenido);
        link.appendChild(card);

        return link;
      });

      const carrusel = crearCarrusel(tema.title, cards);
      main.appendChild(carrusel); // Se agrega el carrusel de inmediato
    } catch (error) {
      console.error("Error al cargar datos para el tema:", tema, error);
    }
  }

  return main;
};