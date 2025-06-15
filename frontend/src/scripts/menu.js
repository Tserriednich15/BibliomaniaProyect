import protegerVista from './protegerVista.js';

const menuController = () => {
  protegerVista();

  const main = document.querySelector('.contenedor_menu');

  const contenedor = document.createElement('section');
  contenedor.setAttribute('class', 'menu');

  const titulo = document.createElement('h1');
  titulo.textContent = 'Bienvenido al Menú Principal';

  const parrafo = document.createElement('p');
  parrafo.textContent = 'Selecciona una opción para continuar:';

  const botonLibros = document.createElement('a');
  botonLibros.setAttribute('href', '../views/libros/listado.html');
  botonLibros.setAttribute('class', 'btn');
  botonLibros.textContent = 'Ver Libros';

  const botonCerrarSesion = document.createElement('button');
  botonCerrarSesion.setAttribute('class', 'btn btn-logout');
  botonCerrarSesion.textContent = 'Cerrar sesión';

  botonCerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
    window.location.href = '../views/autenticacion/login.html';
  });

  contenedor.append(titulo, parrafo, botonLibros, botonCerrarSesion);

  main.append(contenedor);
};

export default menuController();