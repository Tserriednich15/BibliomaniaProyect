// src/mainCategorias.js
import {crearHeader} from "./components/header.js";
import { crearFooter } from "./components/footer.js";
import categoriasView from "./views/categoriasView.js";
import initCategoriasController from "./controllers/categoriaController.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  if (!app) {
    console.error("No se encontró el elemento con id 'app'");
    return;
  }

  app.innerHTML = "";

  // Insertar header
  app.appendChild(crearHeader());

  // Insertar vista de categorías (el contenedor donde se cargarán los carruseles)
  const view = categoriasView();
  app.appendChild(view);

  // Llamar al controlador para que genere el contenido en 'contenedor_index'
  initCategoriasController();

  // Insertar footer
  app.appendChild(crearFooter());
});
