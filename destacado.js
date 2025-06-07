export function crearDestacado(destacado) {
    const seccion = document.createElement("section");
    seccion.className = "destacado";
  
    const titulo = document.createElement("h2");
    titulo.textContent = "Ficha destacada";
  
    const card = document.createElement("div");
    card.className = "card-destacada";
  
    const imagen = document.createElement("img");
    imagen.src = destacado.imagen;
    imagen.alt = destacado.titulo;
  
    const nombre = document.createElement("h3");
    nombre.textContent = destacado.titulo;
  
    const resumen = document.createElement("p");
    resumen.textContent = destacado.descripcion;
  
    card.appendChild(imagen);
    card.appendChild(nombre);
    card.appendChild(resumen);
  
    seccion.appendChild(titulo);
    seccion.appendChild(card);
  
    return seccion;
  }