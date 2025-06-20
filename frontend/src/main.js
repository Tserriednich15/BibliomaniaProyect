import { crearFooter } from "./components/footer.js";
import { crearHeader } from "./components/header.js";
import { crearSidebar } from "./components/sidebar.js";
import { router } from "./routes/routes.js";

async function iniciarApp() {
  const app = document.querySelector("#app");

  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();
  const mainContainer = document.createElement("main");
  mainContainer.classList.add("content");

  app.append(header, sidebar, mainContainer, footer);

  await router(mainContainer);
}

// Cargar al entrar
window.addEventListener("DOMContentLoaded", iniciarApp);

// Cargar al hacer clic en el historial
window.addEventListener("popstate", async () => {
  const mainContainer = document.querySelector("main.content");
  await router(mainContainer);
});