import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { crearCarrusel } from "./carruselComponent.js";
import { genreMapAnime, genreMapManga, additionalGenres } from "../utils/genreMap.js";

export const crearMain = async () => {
  const main = document.createElement("main");
  main.classList.add("content");

  // --- GALERÍA DE CATEGORÍAS ---
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");

  // Construir el array de categorías para la galería.
  const categoriasAnime = Object.entries(genreMapAnime).map(([key, id]) => {
    const title = key.charAt(0).toUpperCase() + key.slice(1);
    return { key, id, title, tipo: "anime" };
  });

  const categoriasManga = Object.entries(genreMapManga).map(([key, id]) => {
    // Por ejemplo, para "shojo-manga", extraemos la parte "shojo" y la capitalizamos.
    const parts = key.split("-");
    const title = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    return { key, id, title, tipo: "manga" };
  });

  const categorias = [...categoriasAnime, ...categoriasManga];

  async function cargarCategorias() {
    // Agrupar en bloques de 3 para evitar saturar la API (delay de 5 seg)
    for (let i = 0; i < categorias.length; i += 3) {
      const grupo = categorias.slice(i, i + 3);
      await Promise.all(grupo.map(async (cat) => {
        try {
          const data = await obtenerDatosPorGenero(cat.id, cat.tipo);
          const representative = data.length > 0
            ? data[0]
            : {
                title: cat.title,
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s",
              };

          // Enlace hacia la vista de la categoría
          const link = document.createElement("a");
          link.setAttribute("href", `categoria.html?genero=${cat.key}&tipo=${cat.tipo}`);

          // Crear la card usando la clase "card"
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
          gallery.appendChild(link);
        } catch (error) {
          console.error("Error al cargar datos para la categoría:", cat, error);
        }
      }));
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  await cargarCategorias();
  main.appendChild(gallery);

  // --- NUEVOS CARRUSELES ADICIONALES ---
  // Construir el array de nuevos temas usando additionalGenres
  const nuevosTemas = Object.entries(additionalGenres).map(([key, genre]) => {
    return {
      key,
      id: genre.mal_id,
      title: genre.name,
      // Aquí forzamos que el tipo sea "manga" (o ajusta según corresponda)
      tipo: "manga"
    };
  });

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
      main.appendChild(carrusel);
    } catch (error) {
      console.error("Error al cargar datos para el tema:", tema, error);
    }
  }

  return main;
};