export async function getMangaById(id) {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
      const data = await res.json();
      return data.data; // Devolvemos solo los datos útiles
    } catch (error) {
      console.error("Error obteniendo manga desde Jikan API:", error);
      return null;
    }
  }
  
  // Función placeholder para futuras APIs (IMDB, etc.)
  export async function getDataByTipoYId(tipo, id) {
    switch (tipo) {
      case "manga":
        return await getMangaById(id);
      // case "anime": return await getAnimeById(id); // A futuro
      // case "pelicula": return await getPeliculaById(id); // A futuro
      default:
        console.warn("Tipo no soportado:", tipo);
        return null;
    }
  }
  