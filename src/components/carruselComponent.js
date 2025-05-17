// src/components/carruselComponent.js
export function crearCarrusel(genreTitle, cards) {
  const contenedor = document.createElement("section");
  contenedor.classList.add("carrusel_categoria");

  const heading = document.createElement("h1");
  heading.textContent = genreTitle;
  contenedor.appendChild(heading);

  const wrapper = document.createElement("div");
  wrapper.classList.add("carrusel_wrapper");

  cards.forEach(card => {
    card.classList.add("card_item");
    wrapper.appendChild(card);
  });

  contenedor.appendChild(wrapper);
  return contenedor;
}