export default function initCategoriasInicioController() {
  const categorias = [
    { key: "shonen", id: 27, title: "Shonen", image: "shonen.jpg", descripcion: "Acción y aventura para todas las edades." },
    { key: "seinen", id: 37, title: "Seinen", image: "seinen.jpg", descripcion: "Historias más maduras y profundas." },
    { key: "shojo", id: 26, title: "Shojo", image: "shojo.jpg", descripcion: "Romance y amistad en un mundo vibrante." },
    { key: "mecha", id: 18, title: "Mecha", image: "mecha.jpg", descripcion: "Batallas épicas con robots gigantes." },
    { key: "fantasy", id: 6, title: "Fantasy", image: "fantasy.jpg", descripcion: "Universos mágicos llenos de aventuras." },
    { key: "psychological", id: 40, title: "Psychological", image: "psychological.jpg", descripcion: "Narrativas que desafían la mente." },
    { key: "sports", id: 30, title: "Sports", image: "sports.jpg", descripcion: "Acción y emoción en el mundo del deporte." },
    { key: "supernatural", id: 7, title: "Supernatural", image: "supernatural.jpg", descripcion: "Misterios y poderes ocultos." },
    { key: "horror", id: 14, title: "Horror", image: "horror.jpg", descripcion: "Escalofríos y suspense." },
    { key: "mystery", id: 7, title: "Mystery", image: "mystery.jpg", descripcion: "Enigmas por resolver." },
    { key: "slice_of_life", id: 36, title: "Slice of Life", image: "slice_of_life.jpg", descripcion: "Historias cotidianas llenas de emoción." },
    { key: "romance", id: 22, title: "Romance", image: "romance.jpg", descripcion: "Narrativas de amor y relaciones." },
    { key: "drama", id: 8, title: "Drama", image: "drama.jpg", descripcion: "Emociones intensas y profundas." },
    { key: "adventure", id: 2, title: "Adventure", image: "adventure.jpg", descripcion: "Exploraciones y grandes viajes." }
  ];

  const contenedor = document.createElement("div");
  contenedor.id = "carrusel_container";
  contenedor.classList.add("carrusel_wrapper");
  document.getElementById("app").appendChild(contenedor);

  categorias.forEach(categoria => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = `./images/${categoria.image}`;
    img.alt = categoria.title;

    const contenido = document.createElement("div");
    contenido.classList.add("card_contenido");

    const titulo = document.createElement("h2");
    titulo.textContent = categoria.title;

    const descripcion = document.createElement("p");
    descripcion.textContent = categoria.descripcion;

    contenido.appendChild(titulo);
    contenido.appendChild(descripcion);
    card.appendChild(img);
    card.appendChild(contenido);

    card.addEventListener("click", () => {
      window.location.href = `categorias.html?genero=${categoria.key}`;
    });

    contenedor.appendChild(card);
  });
}