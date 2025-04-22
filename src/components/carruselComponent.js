export function crearCarrusel(cards) {
  const carruselContainer = document.createElement('div');
  carruselContainer.classList.add('carrusel-container');

  const carruselInner = document.createElement('div');
  carruselInner.classList.add('carrusel-inner');

  if (!Array.isArray(cards)) {
    console.error("Se esperaba un array de cards, pero se recibió:", cards);
    return document.createTextNode("Error: No se pudo crear el carrusel.");
  }

  cards.forEach(card => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('carrusel-card');
    wrapper.appendChild(card);
    carruselInner.appendChild(wrapper);
  });

  const btnIzq = document.createElement('button');
  btnIzq.textContent = '‹';
  btnIzq.classList.add('carrusel-btn', 'btn-izq');

  const btnDer = document.createElement('button');
  btnDer.textContent = '›';
  btnDer.classList.add('carrusel-btn', 'btn-der');

  btnIzq.addEventListener('click', () => {
    carruselInner.scrollBy({
      left: -carruselInner.offsetWidth,
      behavior: 'smooth'
    });
  });

  btnDer.addEventListener('click', () => {
    carruselInner.scrollBy({
      left: carruselInner.offsetWidth,
      behavior: 'smooth'
    });
  });

  carruselContainer.appendChild(btnIzq);
  carruselContainer.appendChild(carruselInner);
  carruselContainer.appendChild(btnDer);

  return carruselContainer;
}