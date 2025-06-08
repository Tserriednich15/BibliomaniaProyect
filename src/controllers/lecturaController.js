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
  app.innerHTML = "";

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();
  app.appendChild(header);

  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");
  mainContainer.style.padding = "20px";
  app.appendChild(mainContainer);

  const data = await cargarLectura(tipo, id);
  if (data) {
    mostrarLectura(data, mainContainer);
  } else {
    mainContainer.innerHTML = "<p>Error al cargar la información. Inténtalo más tarde.</p>";
  }

  app.appendChild(footer);
});
