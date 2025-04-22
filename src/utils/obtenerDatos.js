export async function obtenerDatos(categoria) {
    try {
      let url, options = {};
  
      if (categoria === "anime") {
        url = "https://api.jikan.moe/v4/top/anime";
      } else if (categoria === "manga") {
        url = "https://api.jikan.moe/v4/top/manga";
      } else if (categoria === "peliculas") {
        url = "https://imdb236.p.rapidapi.com/imdb/top250-movies";
        options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
          }
        };
      } else if (categoria === "series") {
        url = "https://imdb236.p.rapidapi.com/imdb/top250-tv";
        options = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
            'x-rapidapi-host': 'imdb236.p.rapidapi.com'
          }
        };
      } else {
        throw new Error("Categoría no válida");
      }
  
      const res = await fetch(url, options);
      const data = await res.json();
  
      // console.log("Respuesta API:", data);
  
      if ((categoria === "anime" || categoria === "manga") && data.data) {
        return data.data.slice(0, 10).map(item => ({
          title: item.title,
          image: item.images.webp.image_url
        }));
      } else if ((categoria === "peliculas" || categoria === "series") && Array.isArray(data)) {
        return data.slice(0, 10).map(item => ({
          title: item.primaryTitle,
          image: item.primaryImage?.url || "https://via.placeholder.com/150x220?text=Sin+Imagen"
        }));
      }
  
      return [];
  
    } catch (error) {
      console.error(`Error al obtener datos para ${categoria}:`, error);
      return [];
    }
  }
  