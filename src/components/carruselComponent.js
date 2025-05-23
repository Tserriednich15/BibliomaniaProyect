// src/components/carruselComponent.js
export function crearCarrusel(genreTitle, cards) {
  // Contenedor global del carrusel (limitará su ancho y se centrará en el layout)
  const sectionCategorias = document.createElement("div");
  sectionCategorias.classList.add("section_categorias");

  // Título del carrusel (aparece arriba, en una línea separada)
  // Ahora lo hacemos clickable para redirigir a la página de categoría
  const titulo = document.createElement("h1");
  titulo.textContent = genreTitle;
  titulo.style.cursor = "pointer";
  titulo.addEventListener("click", () => {
    // Se redirige a categoria.html con los parámetros de género y tipo.
    window.location.href = `categoria.html?genero=${encodeURIComponent(genreTitle.toLowerCase())}&tipo=anime`;
  });
  sectionCategorias.appendChild(titulo);

  // Contenedor interno que agrupa el viewport del carrusel y los botones
  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carrusel_container");

  // Botón izquierdo
  const btnLeft = document.createElement("button");
  btnLeft.classList.add("scroll-btn", "left");
  btnLeft.innerHTML = `<i class="ri-arrow-left-line"></i>`;
  carouselContainer.appendChild(btnLeft);

  // "Ventana" del carrusel que mostrará las cards y ocultará lo desbordado
  const sectionContent = document.createElement("div");
  sectionContent.classList.add("section_content");

  // Wrapper que contendrá las cards; su ancho se ajusta al contenido (width: max-content)
  const wrapper = document.createElement("div");
  wrapper.classList.add("carrusel_wrapper");
  cards.forEach(card => {
    card.classList.add("card_item");
    wrapper.appendChild(card);
  });
  sectionContent.appendChild(wrapper);
  carouselContainer.appendChild(sectionContent);

  // Botón derecho
  const btnRight = document.createElement("button");
  btnRight.classList.add("scroll-btn", "right");
  btnRight.innerHTML = `<i class="ri-arrow-right-line"></i>`;
  carouselContainer.appendChild(btnRight);

  sectionCategorias.appendChild(carouselContainer);

  // Lógica de desplazamiento (sin cambios sustanciales)
  let scrollPosition = 0;
  function getVisibleCount() {
    let count = 0;
    let totalWidth = 0;
    const items = Array.from(wrapper.children);
    for (const item of items) {
      const style = window.getComputedStyle(item);
      const width =
        item.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight);
      if (totalWidth + width <= sectionContent.clientWidth) {
        totalWidth += width;
        count++;
      } else {
        break;
      }
    }
    return count || 1;
  }
  function getFirstVisibleIndex() {
    const contentRect = sectionContent.getBoundingClientRect();
    const items = Array.from(wrapper.children);
    for (let i = 0; i < items.length; i++) {
      const itemRect = items[i].getBoundingClientRect();
      if (itemRect.right > contentRect.left) {
        return i;
      }
    }
    return 0;
  }
  function calculateDelta() {
    let delta = 0;
    const visibleCount = getVisibleCount();
    const items = Array.from(wrapper.children);
    const startIndex = getFirstVisibleIndex();
    for (let i = startIndex; i < startIndex + visibleCount && i < items.length; i++) {
      const style = window.getComputedStyle(items[i]);
      const width =
        items[i].offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight);
      delta += width;
    }
    return delta;
  }
  btnRight.addEventListener("click", () => {
    const delta = calculateDelta();
    const maxScroll = wrapper.scrollWidth - sectionContent.clientWidth;
    scrollPosition = Math.min(scrollPosition + delta, maxScroll);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
  btnLeft.addEventListener("click", () => {
    const delta = calculateDelta();
    scrollPosition = Math.max(scrollPosition - delta, 0);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });
  return sectionCategorias;
}