import { crearHeader } from "./components/header.js";
import { crearFooter } from "./components/footer.js";
import { initCategoriasController } from "./controllers/categoriaController.js";
import { categoriasView } from "./views/categoriasView.js";
import { crearSidebar } from "./components/sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  const contentContainer = document.createElement("main");
  contentContainer.classList.add("content");
  
  const view = categoriasView();
  contentContainer.appendChild(view);

  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  app.append(header, sidebar, contentContainer, footer);

  initCategoriasController();
});