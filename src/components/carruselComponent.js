/**
 * Crea e inicializa un carrusel adaptable.
 *
 * Se espera que la estructura generada tenga la siguiente jerarquía:
 *
 * <div class="section_categorias">
 *   <h1>Nombre de la categoría</h1>
 *   <div class="carrusel_container">
 *     <button class="scroll-btn left"><i class="ri-arrow-left-line"></i></button>
 *     <div class="section_content">
 *       <div class="carrusel_wrapper">
 *         <!-- Aquí se insertan las cards (cada una con clase "card_item") -->
 *       </div>
 *     </div>
 *     <button class="scroll-btn right"><i class="ri-arrow-right-line"></i></button>
 *   </div>
 * </div>
 *
 * La función calcula de forma dinámica cuántos ítems (cards) caben
 * en la “ventana” visible (section_content) y, al hacer clic en los botones,
 * desplaza esa cantidad completa.
 *
 * @param {string} genreTitle - El título de la categoría.
 * @param {Array<HTMLElement>} cards - Un arreglo de elementos HTML que representan las cards.
 * @returns {HTMLElement} El contenedor del carrusel.
 */
export function crearCarrusel(genreTitle, cards) {
  // Contenedor global del carrusel (limitará su ancho y se centrará en el layout)
  const sectionCategorias = document.createElement("div");
  sectionCategorias.classList.add("section_categorias");

  // Título del carrusel (aparece arriba, en una línea separada)
  const titulo = document.createElement("h1");
  titulo.textContent = genreTitle;
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

  // Variable para llevar el registro del desplazamiento actual
  let scrollPosition = 0;

  // Función que determina cuántas cards caben totalmente en el viewport visible
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

  // Función para obtener el índice del primer ítem (card) visible (parcial o totalmente)
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

  // Calcula el delta (en píxeles) a desplazar basado en la suma de los anchos de los ítems visibles
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

  // Evento en el botón izquierdo: desplaza hacía la izquierda
  btnLeft.addEventListener("click", () => {
    const delta = calculateDelta();
    scrollPosition = Math.max(scrollPosition - delta, 0);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });

  // Evento en el botón derecho: desplaza hacia la derecha
  btnRight.addEventListener("click", () => {
    const delta = calculateDelta();
    const maxScroll = wrapper.scrollWidth - sectionContent.clientWidth;
    scrollPosition = Math.min(scrollPosition + delta, maxScroll);
    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  });

  return sectionCategorias;
}
