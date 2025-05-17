import { crearHeader } from './components/header.js';
import crearSidebar from './components/sidebar.js';
import crearMain from './components/mainSection.js';
import { crearFooter } from './components/footer.js';
import crearMainTop from './components/mainTop.js';
import { crearCarrusel } from './components/carruselComponent.js';
import { cargarItemsPorCategoria } from './models/categoriaModel.js';



window.addEventListener('DOMContentLoaded', async () => {
  const app = document.querySelector('#app');
  const appContainer = document.createElement('div');
  appContainer.classList.add('app-container');

  const content = document.createElement('div');
  content.classList.add('content');
  const contentBody = document.createElement('div');
  contentBody.classList.add('content-body');

  const header = crearHeader();
  const footer = crearFooter();

  // Detectar ruta actual
  const path = window.location.pathname;

  if (path.includes('index.html') || path.endsWith('/')) {
    // === Página principal ===
    const banner = crearMainTop();
    const sidebar = crearSidebar();
    const main = crearMain();

    main.prepend(banner);
    contentBody.appendChild(sidebar);
    contentBody.appendChild(main);
    content.appendChild(contentBody);

    appContainer.appendChild(header);
    appContainer.appendChild(content);
    appContainer.appendChild(footer);
    app.appendChild(appContainer);

    // Cargar carruseles por categoría
    const categorias = ["anime", "manga", "peliculas", "series"];
    for (let categoria of categorias) {
      const items = await cargarItemsPorCategoria(categoria);
      const cards = items.map(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = item.image || "https://via.placeholder.com/150x220?text=No+Image";
        img.alt = item.title || "Sin título";

        const title = document.createElement('h3');
        title.textContent = item.title || "Sin título";

        card.appendChild(img);
        card.appendChild(title);

        return card;
      });

      const carrusel = crearCarrusel(categoria, cards);
      main.appendChild(carrusel);
    }

  } else if (path.includes('categoria.html')) {
    // === Página de categoría ===
    const { default: cargarCategoria } = await import('./controllers/categoriaController.js');
    cargarCategoria(app); // se asume que esta función ya construye el layout internamente

  } else if (path.includes('lectura.html')) {
    // === Página de lectura ===
    const banner = document.createElement('section');
    banner.id = 'lectura_banner';
    banner.classList.add('lectura_banner');

    const details = document.createElement('section');
    details.id = 'lectura_details';
    details.classList.add('lectura_details');

    const main = document.createElement('main');
    main.classList.add('lectura_main');
    main.appendChild(banner);
    main.appendChild(details);

    content.appendChild(main);
    appContainer.appendChild(header);
    appContainer.appendChild(content);
    appContainer.appendChild(footer);
    app.appendChild(appContainer);

    const { default: controladorLectura } = await import('./controllers/lecturaController.js');
    controladorLectura(); // asegúrate de exportar por defecto en lecturaController.js
  }
});