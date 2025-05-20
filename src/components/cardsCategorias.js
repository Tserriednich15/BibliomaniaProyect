export function crearCardsPorCategoria(categorias, contenedor, tipo) {
  categorias.forEach(categoria => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-tipo", categoria.tipo || tipo);
    card.setAttribute("data-id", categoria.id);

    const imagen = document.createElement("img");
    imagen.src = categoria.imagen;
    imagen.alt = categoria.titulo;

    const titulo = document.createElement("h3");
    titulo.textContent = categoria.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = categoria.descripcion;

    card.append(imagen, titulo, descripcion);
    contenedor.appendChild(card);

    // 🔹 **Mover el evento `click` dentro del `forEach` para cada card**
    card.addEventListener("click", () => {
      const tipo = card.getAttribute("data-tipo");
      const id = card.getAttribute("data-id");

      if (tipo && id) {
        console.log(`Redirigiendo a lectura.html?tipo=${tipo}&id=${id}`);
        window.location.href = `lectura.html?tipo=${tipo}&id=${id}`;
      }
    });
  });

  console.log("Total de cards después de insertar:", document.querySelectorAll(".card").length);
}