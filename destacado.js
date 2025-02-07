document.addEventListener("DOMContentLoaded", function () { 
    const destacada = document.querySelector(".destacada");
    const destacadaContenido = document.querySelector(".destacada_contenido");

    if (document.getElementById("anime_container")) {
        fetchDestacadoAnime();
    } else if (document.getElementById("mangas_container")) {
        fetchDestacadoManga();
    } else if (document.getElementById("peliculas_container")) {
        fetchDestacadoPelicula();
    } else if (document.getElementById("series_container")) {
        fetchDestacadoSerie();
    }

    async function fetchDestacadoAnime() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime");
            if (!response.ok) throw new Error("Error al obtener el destacado de anime");
            const data = await response.json();

            const destacado = data.data[0];
            actualizarDestacado(destacado.images.webp.image_url, destacado.title, destacado.synopsis);
        } catch (error) {
            console.error("Error al cargar el destacado de anime:", error);
        }
    }

    async function fetchDestacadoManga() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/manga");
            if (!response.ok) throw new Error("Error al obtener el destacado de manga");
            const data = await response.json();

            const destacado = data.data[0];
            actualizarDestacado(destacado.images.webp.image_url, destacado.title, destacado.synopsis);
        } catch (error) {
            console.error("Error al cargar el destacado de manga:", error);
        }
    }

    async function fetchDestacadoPelicula() {
        const url = 'https://imdb236.p.rapidapi.com/imdb/top250-movies';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
                'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        };
    
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Error al obtener el destacado de películas");
            const data = await response.json();
    
            const destacado = data[0];
            actualizarDestacado(destacado.primaryImage, destacado.primaryTitle, destacado.description);
        } catch (error) {
            console.error("Error al cargar el destacado de películas:", error);
        }
    }
    

    async function fetchDestacadoSerie() {
        const url = 'https://imdb236.p.rapidapi.com/imdb/top250-tv';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ed92e010f7mshaf13bff8923d8dcp17c7d8jsna6a8153a5095',
                'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Error al obtener el destacado de series");
            const data = await response.json();

            const destacado = data[0];
            actualizarDestacado(destacado.primaryImage, destacado.primaryTitle, destacado.description);
        } catch (error) {
            console.error("Error al cargar el destacado de series:", error);
        }
    }

    function actualizarDestacado(imagen, titulo, descripcion) {
        destacada.style.backgroundImage = `url('${imagen}')`;
        destacadaContenido.innerHTML = `
            <h2>Destacado del mes</h2>
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
            <a href="#" class="btn_ver_mas">Ver más</a>
        `;
    }
});
