// import { crearHeader } from "./components/header.js";
// import { crearSidebar } from "./components/sidebar.js";
// import { crearMain } from "./components/mainSection.js";
// import { crearFooter } from "./components/footer.js";
// import { initCategoriasController } from "./controllers/categoriaController.js";

// // Escucha el evento DOMContentLoaded para iniciar la aplicación
// window.addEventListener("DOMContentLoaded", async () => {
//   // Seleccionamos el contenedor principal #app
//   const app = document.getElementById("app");

//   // Creamos e inyectamos las partes estáticas: header, sidebar, footer.
//   const header = crearHeader();
//   const sidebar = crearSidebar();
//   const footer = crearFooter();

//   // Creamos un contenedor para el contenido dinámico y le agregamos un loader
//   const mainContainer = document.createElement("main");
//   mainContainer.classList.add("content");
//   const loader = document.createElement("p");
//   loader.textContent = "Cargando contenido, por favor espera…";
//   loader.classList.add("loader");
//   mainContainer.appendChild(loader);

//   // Inyectamos inmediatamente las partes estáticas y el contenedor principal
//   app.append(header, sidebar, mainContainer, footer);

//   // Procedemos a cargar los datos dinámicos (cards y carruseles) a través de crearMain()
//   const dynamicContent = await crearMain();
//   // Reemplazamos el contenido del contenedor principal
//   mainContainer.innerHTML = ""; // Eliminamos el loader
//   while (dynamicContent.firstChild) {
//     mainContainer.appendChild(dynamicContent.firstChild);
//   }

//   // Si estamos en la página de categoría, iniciamos el controlador de categorías
//   if (window.location.pathname.includes("categoria.html")) {
//     initCategoriasController();
//   }
// });

import { crearHeader } from "./components/header.js";
import { crearSidebar } from "./components/sidebar.js";
import { crearMain } from "./components/mainSection.js";
import { crearFooter } from "./components/footer.js";
import { initCategoriasController } from "./controllers/categoriaController.js";

// Escucha el evento DOMContentLoaded para iniciar la aplicación
window.addEventListener("DOMContentLoaded", async () => {
  // Seleccionamos el contenedor principal #app
  const app = document.getElementById("app");

  // Creamos e inyectamos las partes estáticas: header, sidebar, footer.
  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  // Creamos un contenedor para el contenido dinámico y le agregamos un loader
  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");
  const loader = document.createElement("p");
  loader.textContent = "Cargando contenido, por favor espera…";
  loader.classList.add("loader");
  mainContainer.appendChild(loader);

  // Inyectamos inmediatamente las partes estáticas y el contenedor principal
  app.append(header, sidebar, mainContainer, footer);

  // Procedemos a cargar el contenido dinámico (por ejemplo, carruseles y demás)
  const dynamicContent = await crearMain();
  mainContainer.innerHTML = ""; // Eliminamos el loader
  while(dynamicContent.firstChild) {
    mainContainer.appendChild(dynamicContent.firstChild);
  }

  // Si estamos en la página de categoría, iniciamos el controlador de categorías
  if (window.location.pathname.includes("categoria.html")) {
    initCategoriasController();
  }
});
