// src/views/visitantes/menuController.js

export default function menuController() {
  const cardLibros = document.querySelector('#card_libros');
  const cardAutores = document.querySelector('#card_autores');
  const cardCategorias = document.querySelector('#card_categorias');

  if (cardLibros) {
    cardLibros.addEventListener('click', () => {
      // CORREGIDO: Usamos la ruta sin la barra inicial
      location.hash = 'libros'; 
    });
  }
  
  if (cardAutores) {
    cardAutores.addEventListener('click', () => {
      location.hash = 'autores';
    });
  }

  if (cardCategorias) {
    cardCategorias.addEventListener('click', () => {
      // Recuerda añadir esta ruta en tu router.js cuando la necesites
      location.hash = 'categorias';
    });
  }
}