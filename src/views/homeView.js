const categoriasView = () => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo"); // "animes", "peliculas", etc.
  
    const section = document.createElement("section");
    section.classList.add("categoria");
  
    const h2 = document.createElement("h2");
    h2.textContent = `Estás viendo la categoría: ${tipo?.toUpperCase() || "Desconocida"}`;
    section.appendChild(h2);
  
    // Aquí puedes poner contenido dinámico según la categoría
    const descripcion = document.createElement("p");
  
    switch (tipo) {
      case "animes":
        descripcion.textContent = "Aquí encontrarás los mejores animes recomendados.";
        break;
      case "peliculas":
        descripcion.textContent = "Disfruta de una selección de películas imperdibles.";
        break;
      case "series":
        descripcion.textContent = "Las series más populares están aquí.";
        break;
      case "mangas":
        descripcion.textContent = "Sumérgete en el mundo de los mangas.";
        break;
      default:
        descripcion.textContent = "Categoría no encontrada.";
    }
  
    section.appendChild(descripcion);
  
    return section;
  };
  
  export default categoriasView;
  