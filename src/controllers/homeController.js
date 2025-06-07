import { crearMain } from "../components/mainSection.js";

export function homeController() {
  const app = document.getElementById("app");

  // Limpia el contenedor y crea la vista
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }

  crearMain().then(content => {
    app.appendChild(content);
  });
}