import { cargarLectura } from "../models/lecturaModel.js";
import { mostrarLectura } from "../views/lecturaView.js";
import { crearHeader } from "../components/header.js";
import { crearSidebar } from "../components/sidebar.js";
import { crearFooter } from "../components/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("tipo");
  const id = params.get("id");

  if (!tipo || !id) {
    console.error("Faltan parámetros en la URL. Se esperan 'tipo' e 'id'.");
    return;
  }

  console.log("Parámetros recibidos:", { tipo, id });

  const app = document.getElementById("app");
  if (!app) {
    console.error("No se encontró el contenedor 'app'");
    return;
  }
  // Limpiar el contenedor principal
  app.innerHTML = "";

  // Insertar header, sidebar y footer con sus respectivas etiquetas y clases
  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();
  app.appendChild(header);
  app.appendChild(sidebar);

  // Crea el contenedor principal para la lectura usando la clase "content"
  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");  // Esto aplica grid-area: main desde styles.css
  // Opcional: agrega padding para separar el contenido de los bordes
  mainContainer.style.padding = "20px";
  app.appendChild(mainContainer);

  // Cargar la información detallada desde la API
  const data = await cargarLectura(tipo, id);
  if (data) {
    // Renderiza la vista de lectura inyectando su contenido en mainContainer
    mostrarLectura(data, mainContainer);
  } else {
    mainContainer.innerHTML = "<p>Error al cargar la información. Inténtalo más tarde.</p>";
  }

  app.appendChild(footer);
});
