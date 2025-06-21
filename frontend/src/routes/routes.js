import { crearFooter } from "../components/footer.js";
import { crearHeader } from "../components/header.js";
import { crearSidebar } from "../components/sidebar.js";
import mostrarLogin from "../views/autenticacion/login.js"
import mostrarRegistro from "../views/autenticacion/registro.js";
import menuController from "../views/visitantes/menu.js";
// import { initLibros } from "../scripts/libros.js";

const routes = {
  // Rutas públicas
  '/': { 
    path: 'views/autenticacion/login.html',
    controller: mostrarLogin,
    protected: false 
    },
  login: { 
    path: 'views/autenticacion/login.html',
    controller: mostrarLogin,
    protected: false
   },
  registro: {
    path: 'views/autenticacion/registro.html',
    controller: mostrarRegistro,
    protected: false
   },
  menu: {
    path: 'views/visitantes/menu.html',
    controller: menuController,
    protected: true
   },
  libros: {
    path: 'views/libros/listado.html',
    // controller: initLibros,
    protected: true
  },
};

export const router = async (app) => {
  app.innerHTML = '';
  const hash = location.hash.slice(1).toLowerCase() || '/';
  const route = routes[hash] || routes['/'];

  if (route.protected) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      location.hash = '/login';
      return;
    }
  }

  if (route.layout) {

    const header = crearHeader();
    const sidebar = crearSidebar();
    const footer = crearFooter();
    const mainContainer = document.createElement("main");
    mainContainer.classList.add("content");

    const response = await fetch(route.path);
    mainContainer.innerHTML = await response.text();

    app.append(header, sidebar, mainContainer, footer);
  } else {
    const response = await fetch(route.path);
    app.innerHTML = await response.text();
  }

  if (route.controller) {
    route.controller();
  }
};