// src/models/lecturaModel.js
import { fetchData } from "../utils/fetchData.js";

export async function cargarLectura(tipo, id) {
  try {
    // Usamos la ruta de Jikan para anime o manga
    const url = `https://api.jikan.moe/v4/${tipo}/${id}`;
    const res = await fetchData(url);
    if (res && res.data) {
      const d = res.data;
      return {
        titulo: d.title || "Sin título",
        descripcion: d.synopsis || "Sin descripción disponible.",
        imagen: d.images?.jpg?.image_url || "https://via.placeholder.com/300x400?text=No+Image",
        episodios: d.episodes || d.chapters || "Desconocido",
        estado: d.status || "Desconocido",
        generos: d.genres ? d.genres.map(g => g.name) : [],
        rating: d.rating || "No especificado",
        score: d.score || "No especificado",
        rank: d.rank || "No especificado",
        // Para las fechas, Jikan v4 puede usar 'aired' en anime; si no, intentamos con start_date/end_date
        start_date: d.aired ? d.aired.from : (d.start_date || "No especificado"),
        end_date: d.aired ? d.aired.to : (d.end_date || "No especificado"),
        members: d.members || "No especificado"
      };
    }
    return null;
  } catch (error) {
    console.error(`Error al cargar lectura para ${tipo} con ID ${id}:`, error);
    return null;
  }
}