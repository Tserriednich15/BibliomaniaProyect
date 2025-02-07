document.querySelectorAll('.section_categorias').forEach((section) => {
const sectionContent = section.querySelector('.section_content');
const btnLeft = section.querySelector('.scroll-btn.left');
const btnRight = section.querySelector('.scroll-btn.right');

// Ancho total que ocupa una tarjeta (ancho + gap)
const cardWidth = 300 + 20;
let scrollPosition = 0;

// Botón izquierdo
btnLeft.addEventListener('click', () => {
  scrollPosition = Math.max(scrollPosition - cardWidth * 5, 0);
  sectionContent.style.transform = `translateX(-${scrollPosition}px)`;
});

// Botón derecho
btnRight.addEventListener('click', () => {
  const maxScroll = Math.max((sectionContent.children.length - 3) * cardWidth, 0);
  scrollPosition = Math.min(scrollPosition + cardWidth * 3, maxScroll);
  sectionContent.style.transform = `translateX(-${scrollPosition}px)`;
  
  });
});