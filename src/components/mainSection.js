// src/components/mainSection.js
import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";
import { crearCarrusel } from "./carruselComponent.js";

const crearMain = async () => {
  const main = document.createElement("main");
  main.classList.add("content");

  // --- GALERÍA DE CATEGORÍAS ---
  const gallery = document.createElement("div");
  gallery.classList.add("gallery");

  const categorias = [
    { key: "shonen", id: 27, title: "Shonen", tipo: "anime" },
    { key: "seinen", id: 37, title: "Seinen", tipo: "anime" },
    { key: "shojo", id: 26, title: "Shojo", tipo: "anime" },
    { key: "isekai", id: 142, title: "Isekai", tipo: "anime" },
    { key: "mecha", id: 18, title: "Mecha", tipo: "anime" },
    { key: "fantasy", id: 6, title: "Fantasy", tipo: "anime" },
    { key: "psychological", id: 40, title: "Psychological", tipo: "anime" },
    { key: "sports", id: 30, title: "Sports", tipo: "anime" },
    { key: "supernatural", id: 7, title: "Supernatural", tipo: "anime" },
    { key: "romance", id: 22, title: "Romance", tipo: "anime" },
    { key: "drama", id: 8, title: "Drama", tipo: "anime" },
    { key: "adventure", id: 2, title: "Adventure", tipo: "anime" },
    { key: "horror", id: 14, title: "Horror", tipo: "anime" },
    { key: "shonen", id: 27, title: "Shonen Manga", tipo: "manga" },
    { key: "shojo", id: 26, title: "Shojo Manga", tipo: "manga" }
  ];

  async function cargarCategorias() {
    // Agrupar en bloques de 3 para evitar saturar la API (con un delay de 5 s)
    for (let i = 0; i < categorias.length; i += 3) {
      const grupo = categorias.slice(i, i + 3);
      
      await Promise.all(grupo.map(async (cat) => {
        try {
          const data = await obtenerDatosPorGenero(cat.id, cat.tipo);
          const representative = data.length > 0
            ? data[0]
            : {
                title: cat.title,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s",
              };

          // Enlace hacia la vista de la categoría
          const link = document.createElement("a");
          link.href = `categoria.html?genero=${cat.key}&tipo=${cat.tipo}`;

          // Crear la card con clases "card", "card_contenido" y "titulo_cards"
          const card = document.createElement("div");
          card.classList.add("card");

          const img = document.createElement("img");
          img.src = representative.image;
          img.alt = representative.title;
          img.setAttribute("loading", "lazy");

          const contenido = document.createElement("div");
          contenido.classList.add("card_contenido");

          const h1 = document.createElement("h1");
          h1.classList.add("titulo_cards");
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

      await new Promise(resolve => setTimeout(resolve, 5000)); // Delay de 5 s cada 3 categorías
    }
  }

  await cargarCategorias();
  main.appendChild(gallery);

  // --- NUEVOS CARRUSELES ADICIONALES ---
  // Array con 5 nuevos temas basados en los endpoints que proporcionaste:
  const nuevosTemas = [
    { key: "avant_garde", id: 5, title: "Avant Garde", tipo: "manga" },
    { key: "award_winning", id: 46, title: "Award Winning", tipo: "manga" },
    { key: "fantasy", id: 10, title: "Fantasy", tipo: "manga" },
    { key: "gourmet", id: 47, title: "Gourmet", tipo: "manga" },
    { key: "suspense", id: 45, title: "Suspense", tipo: "manga" }
  ];

  // Para cada nuevo tema, se generan las cards y se crea un carrusel
  for (let tema of nuevosTemas) {
    try {
      const data = await obtenerDatosPorGenero(tema.id, tema.tipo);
      // Se crean los elementos de card para cada ítem obtenido
      const cards = data.map(item => {
        const link = document.createElement("a");
        link.href = `categoria.html?genero=${tema.key}&tipo=${tema.tipo}`;
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s";
        img.alt = item.title;
        img.setAttribute("loading", "lazy");

        const contenido = document.createElement("div");
        contenido.classList.add("card_contenido");

        const h1 = document.createElement("h1");
        h1.classList.add("titulo_cards");
        h1.textContent = item.title || tema.title;

        contenido.appendChild(h1);
        card.appendChild(img);
        card.appendChild(contenido);
        link.appendChild(card);

        return link;
      });
      // Crear el carrusel usando la función existente, con el título del tema y el conjunto de cards
      const carrusel = crearCarrusel(tema.title, cards);
      main.appendChild(carrusel);
    } catch (error) {
      console.error("Error al cargar datos para el tema:", tema, error);
    }
  }

  return main;
};

export default crearMain;
