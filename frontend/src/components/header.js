// src/components/header.js
import crearSidebar from './sidebar.js'; // Importamos el componente de la sidebar

function crearHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header_container");

  // --- LADO IZQUIERDO: Hamburguesa y Logo ---
  const leftSide = document.createElement("div");
  leftSide.classList.add("header_left");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "Bibliomania";

  // --- LADO DERECHO: Navegación Principal ---
  const rightSideNav = document.createElement("nav");
  rightSideNav.classList.add("main_nav");

  const token = localStorage.getItem('accessToken');

  if (token) {
    // Si está logueado, creamos el menú hamburguesa a la izquierda
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.classList.add("hamburger_btn");
    
    const hamburgerIcon = document.createElement("i");
    hamburgerIcon.className = "ri-menu-line"; // Icono que pediste
    hamburgerBtn.appendChild(hamburgerIcon);
    
    hamburgerBtn.addEventListener('click', () => {
      crearSidebar();
    });

    leftSide.append(hamburgerBtn, logo);

    // Enlaces principales que se quedan a la derecha
    const linkMenu = document.createElement("a");
    linkMenu.textContent = "Menú";
    linkMenu.href = "#menu";
    
    const linkLogout = document.createElement("a");
    linkLogout.textContent = "Cerrar Sesión";
    linkLogout.href = "#logout";
    linkLogout.id = 'logout_btn'; 

    rightSideNav.append(linkMenu, linkLogout);

  } else {
    // Si no está logueado, solo el logo a la izquierda
    leftSide.appendChild(logo);

    // Y los enlaces de login/registro a la derecha
    const linkLogin = document.createElement("a");
    linkLogin.textContent = "Iniciar Sesión";
    linkLogin.href = "#login";

    const linkRegistro = document.createElement("a");
    linkRegistro.textContent = "Registro";
    linkRegistro.href = "#registro";
    
    rightSideNav.append(linkLogin, linkRegistro);
  }

  // Ensamblamos el header
  headerContainer.append(leftSide, rightSideNav);
  header.appendChild(headerContainer);

  // El listener para el botón de logout se busca dentro del header recién creado
  const logoutBtn = header.querySelector('#logout_btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      window.dispatchEvent(new Event('hashchange')); 
    });
  }

  return header;
}

export default crearHeader;