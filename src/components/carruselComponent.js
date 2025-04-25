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
    card.classList.add('card_item'); // aseguramos el tamaño correcto
    track.appendChild(card);
  });

  carrusel.appendChild(track);
  carruselWrapper.appendChild(carrusel);

  // Botones
  const btnIzq = document.createElement('button');
  btnIzq.textContent = '‹';
  btnIzq.classList.add('scroll-btn', 'left');

  const btnDer = document.createElement('button');
  btnDer.textContent = '›';
  btnDer.classList.add('scroll-btn', 'right');

  carruselWrapper.appendChild(btnIzq);
  carruselWrapper.appendChild(btnDer);

  // Agregamos todo al contenedor
  contenedor.appendChild(carruselWrapper);

  // Lógica del scroll
  let posicionScroll = 0;
  const cardWidth = 240 + 16; // ancho + gap
  const totalCards = cards.length;

  btnDer.addEventListener('click', () => {
    const maxScroll = (totalCards - 5) * cardWidth;
    posicionScroll = Math.min(posicionScroll + cardWidth * 5, maxScroll);
    track.style.transform = `translateX(-${posicionScroll}px)`;
  });

  btnIzq.addEventListener('click', () => {
    posicionScroll = Math.max(posicionScroll - cardWidth * 5, 0);
    track.style.transform = `translateX(-${posicionScroll}px)`;
  });

  return contenedor;
}
