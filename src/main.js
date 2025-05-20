import { crearHeader } from './components/header.js';
import crearSidebar from './components/sidebar.js';
import crearMain from './components/mainSection.js';
import { crearFooter } from './components/footer.js';
import crearMainTop from './components/mainTop.js';
import { crearCarrusel } from './components/carruselComponent.js';
import { cargarItemsPorCategoria } from './models/categoriaModel.js';

window.addEventListener('DOMContentLoaded', async () => {
  const body = document.querySelector('body.principal_page');

  // Crear los elementos principales:
  const header = crearHeader();
  const sidebar = crearSidebar();
  const main = crearMain();
  const footer = crearFooter();

  // Detectar la ruta actual y construir el contenido:
  const path = window.location.pathname;
  if (path.includes('index.html') || path.endsWith('/')) {
    const banner = crearMainTop();
    main.prepend(banner);

    // Cargar carruseles por categoría en <main>
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

        card.append(img, title);
        return card;
      });

      const carrusel = crearCarrusel(categoria, cards);
      main.appendChild(carrusel);
    }
  } else if (path.includes('categoria.html')) {
    const { default: cargarCategoria } = await import('./controllers/categoriaController.js');
    cargarCategoria(main); // Pasa 'main' en lugar de 'app'
  } else if (path.includes('lectura.html')) {
    const banner = document.createElement('section');
    banner.id = 'lectura_banner';
    banner.classList.add('lectura_banner');

    const details = document.createElement('section');
    details.id = 'lectura_details';
    details.classList.add('lectura_details');

    main.classList.add('lectura_main');
    main.append(banner, details);

    const { default: controladorLectura } = await import('./controllers/lecturaController.js');
    controladorLectura();
  }

  // Insertar los elementos en el body en el orden correcto:
  body.append(header, sidebar, main, footer);
});
