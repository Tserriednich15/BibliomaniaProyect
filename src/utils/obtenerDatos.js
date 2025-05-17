// src/utils/obtenerDatos.js
import { fetchData } from "./fetchData.js";
import { getCachedData } from "./cacheData.js";

export async function obtenerDatosPorGenero(genreId) {
  const url = `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=score&sort=desc`;
  
  const fetchFunction = async () => {
    const res = await fetchData(url);
    if (res && res.data) {
      return res.data.slice(0, 35).map(item => ({
        title: item.title,
        image: item.images.jpg.image_url, // Puedes cambiar a webp si lo prefieres.
        id: item.mal_id,
        tipo: "anime"
      }));
    }
    return [];
  };
  
  return await getCachedData("genre_" + genreId, fetchFunction, 60);
}