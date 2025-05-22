async function cargarContenidoPorCategoria(categoria) {
    // Aquí podrías usar una API real, por ahora simulamos
    const datos = await obtenerDatosFalsos(categoria);
    const contenedor = document.querySelector(`#wrapper-${categoria} .section_content`);
  
    datos.forEach(dato => {
      const card = document.createElement('div');
      card.classList.add('card');
  



      //Quitar esto, debo de utilizar create element, set atribute y eso, esto de innerHTML 
      //Está mal
      card.innerHTML = `
        <img src="${dato.imagen}" alt="${dato.titulo}">
        <div class="card_contenido_categorias">
          <h1>${dato.titulo}</h1>
          <p>${dato.descripcion}</p>
        </div>
      `;
  
      contenedor.appendChild(card);
    });
  }