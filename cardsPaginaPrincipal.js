document.addEventListener("DOMContentLoaded", async function () {
    const categorias = ["anime", "manga", "peliculas", "series"];
    const contenedor_index = document.getElementById("contenedor_index");

    async function obtenerDatos(categoria) {
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

            const respuesta = await fetch(url, options);
            const data = await respuesta.json();

            if (!data.data && !Array.isArray(data)) {
                throw new Error("Estructura de datos incorrecta");
            }

            if (categoria === "anime" || categoria === "manga") {
                return data.data
                    .filter(item => item.images.webp.image_url)
                    .slice(0, 6)
                    .map(item => ({
                        title: item.title,
                        image: item.images.webp.image_url
                    }));
            } else {
                return data.slice(0, 6).map(item => ({
                    title: item.primaryTitle,
                    image: item.primaryImage
                }));
            }

        } catch (error) {
            console.error(`Error al obtener ${categoria}:`, error);
            return [];
        }
    }

    async function cargarIndex() {
        for (let categoria of categorias) {
            const items = await obtenerDatos(categoria);
            const seccion = document.createElement("section");
            seccion.classList.add("section_categorias");
            seccion.innerHTML = `
                <button class="scroll-btn left">&#10094;</button>
                <div class="section_wrapper">
                    <div class="section_content">
                        ${items.map(item => `
                            <div class="card_categorias">
                                <img src="${item.image}" alt="${item.title}">
                                <div class="card_contenido_categorias">
                                    <h1>${item.title}</h1>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <button class="scroll-btn right">&#10095;</button>
            `;
            contenedor_index.appendChild(seccion);
        }

        agregarDesplazamiento(); // Llamar a la función después de cargar los elementos
    }

    function agregarDesplazamiento() {
        document.querySelectorAll('.section_categorias').forEach((section) => {
            const sectionContent = section.querySelector('.section_content');
            const btnLeft = section.querySelector('.scroll-btn.left');
            const btnRight = section.querySelector('.scroll-btn.right');

            btnLeft.addEventListener('click', () => {
                sectionContent.scrollBy({ left: -300, behavior: "smooth" });
            });

            btnRight.addEventListener('click', () => {
                sectionContent.scrollBy({ left: 300, behavior: "smooth" });
            });
        });
    }

    cargarIndex();
});
