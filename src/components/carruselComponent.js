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
<<<<<<< HEAD
    card.classList.add("card_item");
    wrapper.appendChild(card);
=======
    const cardItem = document.createElement('div');
    cardItem.classList.add('card_item');

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.title;
    cardItem.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = card.title;
    cardItem.appendChild(title);

    track.appendChild(cardItem);
  });

  carrusel.appendChild(track);
  carruselWrapper.appendChild(carrusel);

  const btnIzq = document.createElement('button');
  btnIzq.textContent = '‹';
  btnIzq.classList.add('scroll-btn', 'left');

  const btnDer = document.createElement('button');
  btnDer.textContent = '›';
  btnDer.classList.add('scroll-btn', 'right');

  carruselWrapper.appendChild(btnIzq);
  carruselWrapper.appendChild(btnDer);

  contenedor.appendChild(carruselWrapper);

  btnDer.addEventListener('click', () => {
    carrusel.scrollBy({
      left: carrusel.offsetWidth,
      behavior: "smooth"
    });
  });

  btnIzq.addEventListener('click', () => {
    carrusel.scrollBy({
      left: -carrusel.offsetWidth,
      behavior: "smooth"
    });
>>>>>>> 0849479e59ef1ef9becc56ea055b06d6e5054206
  });

  contenedor.appendChild(wrapper);
  return contenedor;
}