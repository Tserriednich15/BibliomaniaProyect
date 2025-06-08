export async function getMangaById(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error obteniendo manga desde Jikan API:", error);
    return null;
  }
}

export async function getDataByTipoYId(tipo, id) {
  switch (tipo) {
    case "manga":
      return await getMangaById(id);
    default:
      console.warn("Tipo no soportado:", tipo);
      return null;
  }
}
