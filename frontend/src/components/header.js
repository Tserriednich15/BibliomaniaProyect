import crearSidebar from './sidebar.js';
import fetchWithAuth, { clearAuthTokens } from '../helpers/fetchWithAuth.js';
import { mostrarExito } from '../helpers/notificaciones_helper.js';

function crearHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header_container");

  const leftSide = document.createElement("div");
  leftSide.classList.add("header_left");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "Bibliomania";

  const rightSideNav = document.createElement("nav");
  rightSideNav.classList.add("main_nav");

  const token = localStorage.getItem('accessToken');

  if (token) {
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.classList.add("hamburger_btn");

    const hamburgerIcon = document.createElement("i");
    hamburgerIcon.className = "ri-menu-line";
    hamburgerBtn.appendChild(hamburgerIcon);

    hamburgerBtn.addEventListener('click', () => {
      crearSidebar();
    });

    leftSide.append(hamburgerBtn, logo);

    const linkMenu = document.createElement("a");
    linkMenu.textContent = "Menú";
    linkMenu.href = "#menu";

    const linkLogout = document.createElement("a");
    linkLogout.textContent = "Cerrar Sesión";
    linkLogout.href = "#";
    linkLogout.id = 'logout-btn';
    rightSideNav.append(linkMenu, linkLogout);

  } else {
    leftSide.appendChild(logo);
  }
  
  headerContainer.append(leftSide, rightSideNav);
  header.appendChild(headerContainer);

  const logoutBtn = header.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      try {
        await fetchWithAuth('http://localhost:3000/api/auth/logout', {
          method: 'POST'
        });
      } catch (error) {
        console.error('Error al contactar al servidor para logout, cerrando sesión localmente de todas formas.', error);
      } finally {
        clearAuthTokens();
        await mostrarExito('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
        location.hash = '#login';
      }
    });
  }

  return header;
}

export default crearHeader;