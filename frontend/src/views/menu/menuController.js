const permissions = {
  administrador: ['card_libros', 'card_autores', 'card_categorias', 'card_editoriales', 'card_visitantes', 'card_prestamos', 'card_multas', 'card_usuarios'],
  bibliotecario: ['card_libros', 'card_autores', 'card_categorias', 'card_editoriales', 'card_visitantes', 'card_prestamos', 'card_multas'],
  asistente: ['card_visitantes', 'card_prestamos', 'card_multas']
};

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
  const userRole = localStorage.getItem('userRole')?.toLowerCase();

  const allowedCards = permissions[userRole] || [];

  const allCards = document.querySelectorAll('.card_container .card');

  allCards.forEach(card => {
    if (allowedCards.includes(card.id)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  addNavigationEvent('card_libros', 'libros');
  addNavigationEvent('card_autores', 'autores');
  addNavigationEvent('card_categorias', 'categorias');
  addNavigationEvent('card_editoriales', 'editoriales');
  addNavigationEvent('card_visitantes', 'visitantes');
  addNavigationEvent('card_prestamos', 'prestamos');
  addNavigationEvent('card_multas', 'multas');
  addNavigationEvent('card_usuarios', 'usuarios');

}

export default menuController;