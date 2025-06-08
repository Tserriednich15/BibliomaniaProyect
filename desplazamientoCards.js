document.querySelectorAll('.section_categorias').forEach((section) => {
  const sectionContent = section.querySelector('.section_content');
  const wrapper = section.querySelector('.carrusel_wrapper');
  const btnLeft = section.querySelector('.scroll-btn.left');
  const btnRight = section.querySelector('.scroll-btn.right');
  
  const cardWidth = 300 + 16;  
  let scrollPosition = 0;
  
  btnLeft.addEventListener('click', () => {
    scrollPosition = Math.max(scrollPosition - cardWidth * 3, 0);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
  
  btnRight.addEventListener('click', () => {
    const maxScroll = wrapper.scrollWidth - sectionContent.clientWidth;
    scrollPosition = Math.min(scrollPosition + cardWidth * 3, maxScroll);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
});
