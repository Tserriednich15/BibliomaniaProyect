// scripts/menu.js
import protegerVista from '../autenticacion/protegerVista.js';

const menuController = () => {
  protegerVista();

  const btnLibros = document.getElementById('btnLibros');
  const btnLogout = document.getElementById('btnLogout');

  if (btnLibros) {
    btnLibros.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', '/libros');
      window.dispatchEvent(new Event('popstate'));
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      history.pushState(null, '', '/login');
      window.dispatchEvent(new Event('popstate'));
    });
  }

  document.getElementById('goLibros')?.addEventListener('click', () => {
  history.pushState(null, '', '/libros');
  window.dispatchEvent(new Event('popstate'));
});

document.getElementById('goCategorias')?.addEventListener('click', () => {
  history.pushState(null, '', '/categorias');
  window.dispatchEvent(new Event('popstate'));
});

};

export default menuController;