function menuController() {

  function addNavigationEvent(elementId, route) {
    const element = document.querySelector(`#${elementId}`);
    if (element) {
      element.addEventListener('click', () => {
        location.hash = route;
      });
    } else {
      console.warn(`El elemento con id '${elementId}' no fue encontrado.`);
    }
  }

  addNavigationEvent('card_libros', 'libros');
  addNavigationEvent('card_autores', 'autores');
  addNavigationEvent('card_categorias', 'categorias');
  addNavigationEvent('card_editoriales', 'editoriales');
  addNavigationEvent('card_visitantes', 'visitantes');
  addNavigationEvent('card_prestamos', 'prestamos');
  addNavigationEvent('card_multas', 'multas');

}

export default menuController;