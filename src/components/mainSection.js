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
    }
    if (countCarruseles >= 8) break;
  }
  carruselElements.forEach(carrusel => main.appendChild(carrusel));

  return main;
};
