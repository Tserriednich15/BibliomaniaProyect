// src/mainCategorias.js
import crearHeader from "./components/header.js";
import crearFooter from "./components/footer.js";
import categoriasView from "./views/categoriasView.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");
  if (!app) {
    console.error("No se encontró el elemento con id 'app'");
    return;
  }

  app.innerHTML = ""; // Limpiamos antes de insertar

  // Insertamos el header
  app.appendChild(crearHeader());

  // Cargamos la vista de categorías (que a su vez llama controladores y utils)
  try {
    const vista = await categoriasView(); // Esta función debe devolver un elemento <div> o <section>
    app.appendChild(vista);
  } catch (error) {
    console.error("Error al cargar la vista de categorías:", error);
  }

  // Insertamos el footer
  app.appendChild(crearFooter());
});
