import { fetchData } from "../utils/fetchData.js";
import { crearCarrusel } from "./carruselComponent.js";
import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";

const FALLBACK_IMAGE = "https://via.placeholder.com/300x400?text=No+Image";

async function obtenerGenresManga() {
  const url = "https://api.jikan.moe/v4/genres/manga";
  try {
    const res = await fetchData(url);
    if (!res || !res.data) {
      console.warn("No se encontraron géneros de manga");
      return [];
    }

    return res.data.map(genre => ({ ...genre, type: "manga" }));
  } catch (error) {
    console.error("Error al obtener géneros de manga:", error);
    return [];
  }
}

async function obtenerTopRankedManga() {
  const url = "https://api.jikan.moe/v4/manga?order_by=score&sort=desc";
  try {
    const res = await fetchData(url);
    if (!res || !res.data) {
      console.warn("No se encontraron datos top para manga");
      return [];
    }
    return res.data.slice(0, 200);
  } catch (error) {
    console.error("Error al obtener top-ranked de manga:", error);
    return [];
  }
}

async function procesarGenero(genre, topData) {
  const filtered = topData.filter(item =>
    item.genres &&
    item.genres.some(g => Number(g.mal_id) === Number(genre.mal_id)) &&
    item.images?.jpg?.image_url &&
    item.images.jpg.image_url.trim() !== ""
  );

  if (filtered.length === 0) {
    return null;
  }

  const representative = filtered[0];

  const link = document.createElement("a");
  link.href = `categoria.html?genero=${encodeURIComponent(genre.name)}&tipo=${genre.type}`;

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = representative.images?.jpg?.image_url || FALLBACK_IMAGE;
  img.alt = representative.title;
  img.loading = "lazy";

  const contenido = document.createElement("div");
  contenido.classList.add("card_contenido");

  const h1 = document.createElement("h1");
  h1.classList.add("section_categorias");
  h1.textContent = genre.name;

  contenido.appendChild(h1);
  card.appendChild(img);
  card.appendChild(contenido);
  link.appendChild(card);
  return link;
}

function crearCarruselParaGenero(genre, topData) {
  const filtered = topData.filter(item =>
    item.genres &&
    item.genres.some(g => Number(g.mal_id) === Number(genre.mal_id)) &&
    item.images?.jpg?.image_url &&
    item.images.jpg.image_url.trim() !== ""
  );

  if (filtered.length < 5) {
    return null;
  }

  const cards = filtered.map(item => {
    const link = document.createElement("a");
    link.href = `categoria.html?genero=${encodeURIComponent(genre.name)}&tipo=${genre.type}`;
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = item.images?.jpg?.image_url || FALLBACK_IMAGE;
    img.alt = item.title;
    img.loading = "lazy";

    const contenido = document.createElement("div");
    contenido.classList.add("card_contenido");

    const h1 = document.createElement("h1");
    h1.classList.add("section_categorias");
    h1.textContent = item.title || genre.name;

    contenido.appendChild(h1);
    card.appendChild(img);
    card.appendChild(contenido);
    link.appendChild(card);
    return link;
  });

  return crearCarrusel(genre.name, cards);
}

export const crearMain = async () => {
  const main = document.createElement("main");

<<<<<<< HEAD
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
=======
  main.classList.add("content");
  const [genresMangaRaw, topRankedManga] = await Promise.all([
    obtenerGenresManga(),
    obtenerTopRankedManga()
  ]);

  const uniqueGenresMap = new Map();
  genresMangaRaw.forEach(genre => {
    if (!uniqueGenresMap.has(genre.mal_id)) {
      uniqueGenresMap.set(genre.mal_id, genre);
    }
  });
  let genresManga = Array.from(uniqueGenresMap.values());

  genresManga.sort((a, b) => b.count - a.count);

  const cardsGenero = [];
  for (let genre of genresManga) {
    const card = await procesarGenero(genre, topRankedManga);
    if (card) {
      cardsGenero.push(card);
    }
    if (cardsGenero.length >= 15) break;
  }

  const gallery = document.createElement("div");
  gallery.classList.add("gallery");
  cardsGenero.forEach(card => gallery.appendChild(card));
  main.appendChild(gallery);

  const carruselElements = [];
  let countCarruseles = 0;
  for (let genre of genresManga) {
    const carrusel = crearCarruselParaGenero(genre, topRankedManga);
    if (carrusel) {
      carruselElements.push(carrusel);
      countCarruseles++;
>>>>>>> 264bbdace8f3a4a59c66e7f4e62da273ced73362
    }
    if (countCarruseles >= 8) break;
  }
  carruselElements.forEach(carrusel => main.appendChild(carrusel));

  return main;
};
