// src/components/cardsCategorias.js

export function crearCardsPorCategoria(categorias, contenedor) {
    categorias.forEach(categoria => {
      const card = document.createElement("div");
      card.className = "card-categoria";
  
      const imagen = document.createElement("img");
      imagen.src = categoria.imagen;
      imagen.alt = categoria.titulo;
  
      const titulo = document.createElement("h3");
      titulo.textContent = categoria.titulo;
  
      const descripcion = document.createElement("p");
      descripcion.textContent = categoria.descripcion;
  
      card.appendChild(imagen);
      card.appendChild(titulo);
      card.appendChild(descripcion);
  
      contenedor.appendChild(card);
    });
  }  