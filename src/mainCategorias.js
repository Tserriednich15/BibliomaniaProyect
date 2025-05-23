import { crearHeader } from "./components/header.js";
import { crearFooter } from "./components/footer.js";
import { initCategoriasController } from "./controllers/categoriaController.js";
import { categoriasView } from "./views/categoriasView.js";
import { crearSidebar } from "./components/sidebar.js";

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el contenedor existente #app
  const app = document.getElementById("app");

  // Crea las partes estáticas
  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  // Creamos un contenedor para el contenido principal (main) y le asignamos la clase "content"
  const contentContainer = document.createElement("main");
  contentContainer.classList.add("content");
  
  // Si tienes una vista base de categorías (por ejemplo, categoraisView)
  const view = categoriasView();  // Asegúrate de que esta función retorne un contenedor creado con createElement
  contentContainer.appendChild(view);

  // Inyectamos las partes en #app (como hijos directos, para que se respete la grid layout)
  // Nota: No creamos otro elemento con id "app" aquí.
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  app.append(header, sidebar, contentContainer, footer);

  // Finalmente iniciamos el controlador de categoría
  initCategoriasController();
});
