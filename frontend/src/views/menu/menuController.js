// frontend/src/views/menu/menuController.js

/**
 * Mapa de permisos que define qué vistas puede ver cada rol.
 * La clave es el nombre del rol (en minúsculas para evitar errores de mayúsculas/minúsculas).
 * El valor es un array con los IDs de las tarjetas permitidas.
 */
const permissions = {
  administrador: ['card_libros', 'card_autores', 'card_categorias', 'card_editoriales', 'card_visitantes', 'card_prestamos', 'card_multas', 'card_usuarios'],
  bibliotecario: ['card_libros', 'card_autores', 'card_categorias', 'card_editoriales', 'card_visitantes', 'card_prestamos', 'card_multas'],
  asistente: ['card_visitantes', 'card_prestamos', 'card_multas']
};

/**
 * Controlador principal del menú que ahora incluye lógica de control de acceso por roles.
 */
function menuController() {

  // Función original para añadir eventos, no necesita cambios.
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
  
  // --- LÓGICA DE CONTROL DE ACCESO ---
  
  // 1. Obtenemos el rol del usuario desde localStorage.
  const userRole = localStorage.getItem('userRole')?.toLowerCase(); // Lo ponemos en minúsculas

  // 2. Obtenemos la lista de tarjetas permitidas para ese rol.
  // Si el rol no existe o no está en nuestro mapa, le damos un array vacío por seguridad.
  const allowedCards = permissions[userRole] || [];

  // 3. Obtenemos TODAS las tarjetas del menú.
  const allCards = document.querySelectorAll('.card_container .card');

  // 4. Recorremos cada tarjeta y decidimos si mostrarla u ocultarla.
  allCards.forEach(card => {
    if (allowedCards.includes(card.id)) {
      // Si el ID de la tarjeta está en la lista de permitidas, la mostramos.
      card.style.display = 'block';
    } else {
      // Si no, la ocultamos.
      card.style.display = 'none';
    }
  });

  // --- FIN DE LA LÓGICA DE CONTROL DE ACCESO ---

  // El resto de la función se mantiene igual, asignando los eventos a las tarjetas que sean visibles.
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