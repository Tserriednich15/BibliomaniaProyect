<<<<<<< HEAD
import { crearHeader } from "./components/header.js";
import { crearSidebar } from "./components/sidebar.js";
import { crearMain } from "./components/mainSection.js";
import { crearFooter } from "./components/footer.js";
import { initCategoriasController } from "./controllers/categoriaController.js";

window.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");
  const loader = document.createElement("p");
  loader.textContent = "Cargando contenido, por favor espera…";
  loader.classList.add("loader");
  mainContainer.appendChild(loader);

  app.append(header, sidebar, mainContainer, footer);

  const dynamicContent = await crearMain();
  mainContainer.innerHTML = ""; // Eliminamos el loader
  while(dynamicContent.firstChild) {
    mainContainer.appendChild(dynamicContent.firstChild);
  }

  if (window.location.pathname.includes("categoria.html")) {
    initCategoriasController();
  }
});
=======
import { crearHeader } from "./components/header.js";
import { crearSidebar } from "./components/sidebar.js";
import { crearMain } from "./components/mainSection.js";
import { crearFooter } from "./components/footer.js";
import { initCategoriasController } from "./controllers/categoriaController.js";

window.addEventListener("DOMContentLoaded", async () => {
  // Seleccionamos el contenedor principal #app
  const app = document.getElementById("app");

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");
  const loader = document.createElement("p");
  loader.textContent = "Cargando contenido, por favor espera…";
  loader.classList.add("loader");
  mainContainer.appendChild(loader);

  app.append(header, sidebar, mainContainer, footer);

  const dynamicContent = await crearMain();
  mainContainer.innerHTML = "";
  while (dynamicContent.firstChild) {
    mainContainer.appendChild(dynamicContent.firstChild);
  }

  if (window.location.pathname.includes("categoria.html")) {
    initCategoriasController();
  }
});
>>>>>>> 264bbdace8f3a4a59c66e7f4e62da273ced73362
