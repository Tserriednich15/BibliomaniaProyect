// src/views/lecturaView.js

function crearElemento(tipo, clases = [], contenido = '', atributos = {}) {
    const el = document.createElement(tipo);
    clases.forEach(c => el.classList.add(c));
    if (contenido) el.textContent = contenido;
    for (let attr in atributos) {
      el.setAttribute(attr, atributos[attr]);
    }
    return el;
  }
  
  export function mostrarLectura(data) {
    const banner = document.getElementById("lectura_banner");
    const details = document.getElementById("lectura_details");
  
    if (!banner || !details) return;
  
    // === Sección superior ===
    const titulo = crearElemento("h2", ["lectura_titulo"], data.title || "Sin título");
    const imagen = crearElemento("img", ["lectura_imagen"], '', {
      src: data.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s",
      alt: data.title || "Sin imagen"
    });
  
    banner.appendChild(imagen);
    banner.appendChild(titulo);
  
    // === Detalles ===
    if (data.description) {
      const descripcion = crearElemento("p", ["lectura_descripcion"], data.description);
      details.appendChild(descripcion);
    }
  
    const infoLista = crearElemento("ul", ["lectura_lista"]);
  
    if (data.type) {
      const tipo = crearElemento("li", [], `Tipo: ${data.type}`);
      infoLista.appendChild(tipo);
    }
  
    if (data.year) {
      const anio = crearElemento("li", [], `Año: ${data.year}`);
      infoLista.appendChild(anio);
    }
  
    if (data.status) {
      const estado = crearElemento("li", [], `Estado: ${data.status}`);
      infoLista.appendChild(estado);
    }
  
    if (data.episodes || data.chapters) {
      const episodios = crearElemento(
        "li",
        [],
        `Episodios/Capítulos: ${data.episodes || data.chapters}`
      );
      infoLista.appendChild(episodios);
    }
  
    details.appendChild(infoLista);
  
    // === Tags o Géneros (opcional) ===
    if (data.genres && Array.isArray(data.genres)) {
      const contenedorGeneros = crearElemento("div", ["lectura_generos"]);
      const tituloGeneros = crearElemento("h4", [], "Géneros:");
      contenedorGeneros.appendChild(tituloGeneros);
  
      data.genres.forEach(genero => {
        const tag = crearElemento("span", ["lectura_tag"], genero.name || genero);
        contenedorGeneros.appendChild(tag);
      });
  
      details.appendChild(contenedorGeneros);
    }
  }  