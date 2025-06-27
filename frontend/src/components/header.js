import crearSidebar from './sidebar.js';

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
    linkLogout.href = "#logout";
    linkLogout.id = 'logout_btn';

    rightSideNav.append(linkMenu, linkLogout);

  } else {
    leftSide.appendChild(logo);
  }
  headerContainer.append(leftSide, rightSideNav);
  header.appendChild(headerContainer);

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