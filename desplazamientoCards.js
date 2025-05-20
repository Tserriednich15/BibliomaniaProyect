document.querySelectorAll('.section_categorias').forEach((section) => {
  // Obtener el viewport visible
  const sectionContent = section.querySelector('.section_content');
  // Obtener el wrapper que contiene las cards
  const wrapper = section.querySelector('.carrusel_wrapper');
  // Botones de desplazamiento
  const btnLeft = section.querySelector('.scroll-btn.left');
  const btnRight = section.querySelector('.scroll-btn.right');
  
  // Usamos el ancho fijo de la card + gap (300px + 16px aprox)
  const cardWidth = 300 + 16;  
  let scrollPosition = 0;
  
  // Botón izquierdo: desplaza hacia la izquierda
  btnLeft.addEventListener('click', () => {
    scrollPosition = Math.max(scrollPosition - cardWidth * 3, 0);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
  
  // Botón derecho: desplaza hacia la derecha
  btnRight.addEventListener('click', () => {
    // Calcula el máximo desplazamiento: total del wrapper menos el ancho visible del viewport
    const maxScroll = wrapper.scrollWidth - sectionContent.clientWidth;
    scrollPosition = Math.min(scrollPosition + cardWidth * 3, maxScroll);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
});
