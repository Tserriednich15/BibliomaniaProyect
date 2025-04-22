const crearMain = () => {
    const main = document.createElement("main");
    main.classList.add("content");

    // Sección de cards fijas (por ahora estáticas, luego dinámicas si quieres)
    const gallery = document.createElement("div");
    gallery.classList.add("gallery");
  
    const categorias = [
      {
        titulo: "Animes",
        descripcion: "Historias japonesas con estilos visuales únicos y tramas cautivadoras.",
        imagen: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/757bae5a21039bac6ebace5de9affcd8.jpe",
        enlace: "categoria.html?tipo=anime"
      },
      {
        titulo: "Películas",
        descripcion: "Historias inolvidables que cobran vida en la gran pantalla.",
        imagen: "https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg",
        enlace: "categoria.html?tipo=peliculas"
      },
      {
        titulo: "Series",
        descripcion: "Relatos envolventes que nos atrapan episodio tras episodio.",
        imagen: "https://ckneiferinstructional.wordpress.com/wp-content/uploads/2010/12/tv-shows-completed1.jpg",
        enlace: "categoria.html?tipo=series"
      },
      {
        titulo: "Mangas",
        descripcion: "Historietas japonesas que combinan arte detallado con historias profundas.",
        imagen: "https://i.pinimg.com/736x/ff/e1/1b/ffe11b6c581889ba66ba1a15ecdf5b8b.jpg",
        enlace: "categoria.html?tipo=manga"
      }
    ];    
  
    categorias.forEach(cat => {
      const link = document.createElement("a");
      link.href = cat.enlace;
  
      const card = document.createElement("div");
      card.classList.add("card");
  
      const img = document.createElement("img");
      img.src = cat.imagen;
      img.alt = cat.titulo;
  
      const contenido = document.createElement("div");
      contenido.classList.add("card_contenido");
  
      const h1 = document.createElement("h1");
      h1.textContent = cat.titulo;
  
      const p = document.createElement("p");
      p.textContent = cat.descripcion;
  
      contenido.appendChild(h1);
      contenido.appendChild(p);
      card.appendChild(img);
      card.appendChild(contenido);
      link.appendChild(card);
  
      gallery.appendChild(link);
    });
  
    main.appendChild(gallery);
    
    return main;
  };
  
  export default crearMain;