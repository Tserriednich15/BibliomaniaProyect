document.addEventListener("DOMContentLoaded", function () { 
    const animeContainer = document.getElementById("anime_container");
    const mangasContainer = document.getElementById("mangas_container");
    const peliculasContainer = document.getElementById("peliculas_container");
    const seriesContainer = document.getElementById("series_container");

    if (animeContainer) {
        fetchAnime();
    } else if (mangasContainer) {
        fetchMangas();
    } else if (peliculasContainer) {
        fetchPeliculas();
    } else if (seriesContainer) {
        fetchSeries();
    }

    async function fetchAnime() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/anime");
            if (!response.ok) throw new Error("Error al obtener los datos de anime");
            const data = await response.json();

            animeContainer.innerHTML = "";
            data.data.filter(anime => anime.images.webp.image_url).slice(0, 6).forEach(anime => {
                const animeCard = document.createElement("div");
                animeCard.classList.add("card");
                animeCard.innerHTML = `
                    <img src="${anime.images.webp.image_url}" alt="${anime.title}">
                    <h3>${anime.title}</h3>
                `;
                animeContainer.appendChild(animeCard);
            });
        } catch (error) {
            console.error("Error al cargar los animes:", error);
        }
    }

    async function fetchMangas() {
        try {
            const response = await fetch("https://api.jikan.moe/v4/top/manga");
            if (!response.ok) throw new Error("Error al obtener los datos de manga");
            const data = await response.json();

            mangasContainer.innerHTML = "";
            data.data.filter(manga => manga.images.webp.image_url).slice(0, 6).forEach(manga => {
                const mangaCard = document.createElement("div");
                mangaCard.classList.add("card");
                mangaCard.innerHTML = `
                    <img src="${manga.images.webp.image_url}" alt="${manga.title}">
                    <h3>${manga.title}</h3>
                `;
                mangasContainer.appendChild(mangaCard);
            });
        } catch (error) {
            console.error("Error al cargar los mangas:", error);
        }
    }

    async function fetchPeliculas() {
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
            if (!response.ok) throw new Error("Error al obtener los datos de las películas");
            const data = await response.json();

            peliculasContainer.innerHTML = "";
        data.slice(0, 6).forEach(pelicula => {
            const peliculaCard = document.createElement("div");
            peliculaCard.classList.add("card");
            peliculaCard.innerHTML = `
                <img src="${pelicula.primaryImage}" alt="${pelicula.primaryTitle}">
                <h3>${pelicula.primaryTitle}</h3>
                <p>${pelicula.description}</p>
            `;
            peliculasContainer.appendChild(peliculaCard);
        });
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
}

    async function fetchSeries() {
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
            if (!response.ok) throw new Error("Error al obtener los datos de las series");
            const data = await response.json();

            seriesContainer.innerHTML = "";
            data.slice(0, 6).forEach(serie => {
                const serieCard = document.createElement("div");
                serieCard.classList.add("card");
                serieCard.innerHTML = `
                    <img src="${serie.primaryImage}" alt="${serie.primaryTitle}">
                    <h3>${serie.primaryTitle}</h3>
                    <p>${serie.description}</p>
                `;
                seriesContainer.appendChild(serieCard);
            });
        } catch (error) {
            console.error("Error al cargar las series:", error);
        }
    }
});
