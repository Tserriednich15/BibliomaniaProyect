export function crearCarrusel(categoria, cards) {
  if (!Array.isArray(cards)) {
    console.error("Se esperaba un array de cards, pero se recibió:", cards);
    return;
  }

  const contenedor = document.createElement('section');
  contenedor.classList.add('carrusel_categoria');

  const titulo = document.createElement('h2');
  titulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
  contenedor.appendChild(titulo);

  const carruselWrapper = document.createElement('div');
  carruselWrapper.classList.add('carrusel-wrapper');

  const carrusel = document.createElement('div');
  carrusel.classList.add('carrusel');

  const track = document.createElement('div');
  track.classList.add('carrusel-track');

  cards.forEach(card => {
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
  });

  return contenedor;
}