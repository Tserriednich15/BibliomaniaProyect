import { crearFooter } from "./components/footer.js";
import { crearHeader } from "./components/header.js";
import { crearMain } from "./components/mainSection.js";
import { crearSidebar } from "./components/sidebar.js";
// import { obtenerCategorias } from "./helpers/api.js";

window.addEventListener("DOMContentLoaded", async () => {
  const app = document.querySelector("#app");

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();
  // const obtenerCategorias = obtenerCategorias();

  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");
  const loader = document.createElement("p");
  loader.textContent = "Cargando contenido, por favor espera…";
  loader.classList.add("loader");
  mainContainer.appendChild(loader);

  app.append(header, sidebar, mainContainer, footer);

});
