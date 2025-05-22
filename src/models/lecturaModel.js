// lecturaModel.js
import { getDataByTipoYId } from "./apiModel.js"; // Se asume que esta función envuelve fetch y devuelve JSON

export async function cargarLectura(tipo, id) {
  try {
    let url;
    let options = {}; // Opcional: puedes dejar la configuración por defecto

    if (tipo === "anime") {
      // Endpoint para obtener la información completa de un anime
      url = `https://api.jikan.moe/v4/anime/${id}`;
    } else if (tipo === "manga") {
      // Endpoint para obtener la información completa de un manga
      url = `https://api.jikan.moe/v4/manga/${id}`;
    } else {
      throw new Error("Tipo de contenido no válido");
    }

    // Llamada a la API (se asume que 'getDataByTipoYId' se encarga de hacer el fetch)
    const data = await getDataByTipoYId(url, options);
    
    // Verifica que se obtuvo la información correctamente
    if (data && data.data) {
      const d = data.data;
      // Para ambos tipos extraemos datos comunes. Notar que:
      // - Para anime, usamos 'episodes' para los capítulos.
      // - Para manga, usamos 'chapters'.
      return {
        titulo: d.title || d.title_english || d.title_japanese,
        descripcion: d.synopsis || "Sin descripción",
        generos: d.genres ? d.genres.map(g => g.name) : [],
        capitulos: tipo === "anime" ? (d.episodes !== undefined ? d.episodes : "Desconocido") 
                                     : (d.chapters !== undefined ? d.chapters : "Desconocido"),
        estado: d.status || "Desconocido",
        imagenPortada: d.images && d.images.jpg ? d.images.jpg.image_url : ""
      };
    }
    
    return null; // O lanzar error según convenga

  } catch (error) {
    console.error(`Error al cargar lectura de tipo ${tipo} con ID ${id}:`, error);
    return null;
  }
}
