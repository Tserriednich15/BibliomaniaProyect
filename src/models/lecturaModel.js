import { getDataByTipoYId } from "./apiModel.js";

export async function cargarLectura(tipo, id) {
    try {
        if (tipo === "anime" || tipo === "manga") {
            url = `https://api.jikan.moe/v4/${tipo}/${id}`;
        } else if (tipo === "peliculas") {
            url = `https://imdb236.p.rapidapi.com/movie/${id}`;
            options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
                    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                }
            };
        } else if (tipo === "series") {
            url = `https://imdb236.p.rapidapi.com/show/${id}`;
            options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
                    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
                }
            };
        } else {
            throw new Error("Tipo de contenido no válido");
        }

        const respuesta = await fetch(url, options);
        const data = await respuesta.json();

        if ((tipo === "anime" || tipo === "manga") && data.data) {
            const d = data.data;
            return {
                titulo: d.title || d.title_english || d.title_japanese,
                descripcion: d.synopsis || "Sin descripción",
                generos: d.genres?.map(g => g.name) || [],
                capitulos: d.episodes || d.chapters || "Desconocido",
                estado: d.status || "Desconocido",
                imagenPortada: d.images?.jpg?.image_url || ""
            };
        }

        if ((tipo === "peliculas" || tipo === "series") && data) {
            return {
                titulo: data.title || "Sin título",
                descripcion: data.description || "Sin descripción",
                generos: data.genreList?.map(g => g.value) || [],
                capitulos: tipo === "series" ? (data.episodeCount || "Desconocido") : "N/A",
                estado: data.status || "Desconocido",
                imagenPortada: data.image || ""
            };
            
        }

        return null;

    } catch (error) {
        console.error(`Error al cargar lectura de tipo ${tipo} con ID ${id}:`, error);
        return null;
    }
}