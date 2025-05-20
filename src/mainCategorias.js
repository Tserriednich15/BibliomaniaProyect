import { crearHeader } from "./components/header.js";
import { crearFooter } from "./components/footer.js";
import categoriasView from "./views/categoriasView.js";
import initCategoriasController from "./controllers/categoriaController.js";
import crearSidebar from "./components/sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body.principal_page");
  
  const header = crearHeader();
  const sidebar = crearSidebar();
  const mainSection = document.createElement("main");
  mainSection.id = "app";
  mainSection.style.overflowX = "hidden"; // para evitar scroll global horizontal
  const footer = crearFooter();
  
  const view = categoriasView();
  mainSection.appendChild(view);
  
  body.innerHTML = "";
  body.append(header, sidebar, mainSection, footer);
  
  initCategoriasController();
});