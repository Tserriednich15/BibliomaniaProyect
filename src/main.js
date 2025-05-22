import { crearHeader } from "./components/header.js";
import crearSidebar from "./components/sidebar.js";
import crearMain from "./components/mainSection.js";
import { crearFooter } from "./components/footer.js";
import { crearCarrusel } from "./components/carruselComponent.js";
import { cargarItemsPorCategoria } from "./models/categoriaModel.js";
import initCategoriasController from "./controllers/categoriaController.js";

window.addEventListener("DOMContentLoaded", async () => {
  // Seleccionamos el contenedor #app
  const app = document.getElementById("app");

  // Crear los elementos principales
  const header = crearHeader();
  const sidebar = crearSidebar();
  const footer = crearFooter();

  // Detectar la ruta actual y construir el contenido
  const path = window.location.pathname;

  if (path.includes("index.html") || path.endsWith("/")) {
    const mainSection = await crearMain(); // Carga las categorías en la página principal
    app.append(header, sidebar, mainSection, footer);
  } else if (path.includes("categoria.html")) {
    const main = await crearMain(); // Genera contenido específico para categorías
    app.append(header, sidebar, main, footer);
    initCategoriasController(); // Ejecuta el controlador de categorías (se asume que en esta vista se requiere)
  } else if (path.includes("lectura.html")) {
    const main = document.createElement("main");
    main.classList.add("lectura_main");

    // Cargar carruseles por categoría en <main>
    const categorias = ["anime", "manga"];
    for (let categoria of categorias) {
      const items = await cargarItemsPorCategoria(categoria);
      const cards = items.map(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPb9KqZvuoBmf71tYhOzxOCar7lKi1b9sag&s";
        img.alt = item.title || "Sin título";

        const title = document.createElement("h3");
        title.textContent = item.title || "Sin título";

        card.append(img, title);
        return card;
      });

      const carrusel = crearCarrusel(categoria, cards);
      main.appendChild(carrusel);
    }

    app.append(header, sidebar, main, footer);

    const { default: controladorLectura } = await import("./controllers/lecturaController.js");
    controladorLectura();
  }
});