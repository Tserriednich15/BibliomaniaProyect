import { initCategoriasController } from "../controllers/categoriaController";
import { homeController } from "../controllers/homeController";

const routes = {
  "/": {
    template: "homeView", // Puedes usar esta etiqueta para identificar la vista
    controlador: homeController,
  },
  "categoria": {
    template: "categoriasView",
    controlador: initCategoriasController,
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
  // Obtenemos el hash sin el carácter #
  const hash = location.hash.slice(1) || "/";
  const [route, params] = matchRoute(hash);
  if (route) {
    // Limpiar el contenido previo del app
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
    await loadView(app, route.template);
    route.controlador(params);
  } else {
    // Si no hay coincidencia, mostramos una vista de "Página no encontrada"
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