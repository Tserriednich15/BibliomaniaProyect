import { initCategoriasController } from "../controllers/categoriaController.js";
import { homeController } from "../controllers/homeController.js";
import controladorLectura from "../controllers/lecturaController.js";

const routes = {
  "/": {
    template: "homeView",
    controlador: homeController
  },
  "categoria": {
    template: "categoriaView",
    controlador: initCategoriasController
  },
  "lectura": {
    template: "lecturaView",
    controlador: controladorLectura
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

export async function router() {
  const app = document.getElementById("app");
  const hash = location.hash.slice(1) || "/";
  const [route, params] = matchRoute(hash);
  if (route) {
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
    route.controlador(params);
  } else {
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