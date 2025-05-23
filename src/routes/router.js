// src/routes/router.js
import { initCategoriasController } from "../controllers/categoriaController.js";
import { homeController } from "../controllers/homeController.js";

// Definimos las rutas usando el estilo de tu instructor
const routes = {
  "/": {
    template: "homeView",  // Identificador de la vista principal
    controlador: homeController
  },
  "categoria": {
    template: "categoriaView",
    controlador: initCategoriasController
  }
};

const matchRoute = (hash) => {
  const parts = hash.split("/");
  for (const route in routes) {
    const routeParts = route.split("/");
    if (routeParts.length !== parts.length) continue;
    const params = {};
    const matched = routeParts.every((part, i) => {
      if (part.startsWith(":")) {
        params[part.slice(1)] = parts[i];
        return true;
      }
      return part === parts[i];
    });
    if (matched) return [routes[route], params];
  }
  return [null, {}];
};

// Función loadView comentada (puedes implementarla si la requieres)
// async function loadView(app, template) {
  // Podrías cargar un template externo, pero en este ejemplo no se usará.
  // app.innerHTML = ""; // Limpia el app y crea un contenedor base
// }

export async function router() {
  const app = document.getElementById("app");
  const hash = location.hash.slice(1) || "/";
  const [route, params] = matchRoute(hash);
  if (route) {
    // Limpiar el contenido previo de app
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
    // Si deseas usar loadView, la llamarías aquí; de lo contrario se omite.
    // await loadView(app, route.template);
    route.controlador(params);
  } else {
    // Vista de "Página no encontrada"
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
    const notFound = document.createElement("h1");
    notFound.textContent = "Página no encontrada";
    app.appendChild(notFound);
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);