import crearHeader from './components/header.js';
import crearSidebar from './components/sidebar.js';
import crearMain from './components/mainSection.js';
import crearFooter from './components/footer.js';
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

  // Componentes
  const header = crearHeader();
  const banner = crearMainTop();
  const sidebar = crearSidebar();
  const main = crearMain();
  const footer = crearFooter();
  // Estructura
  contentBody.appendChild(sidebar);
  contentBody.appendChild(main);

  main.prepend(banner)
  content.appendChild(contentBody);

  appContainer.appendChild(header);
  appContainer.appendChild(content);
  appContainer.appendChild(footer);

  app.appendChild(appContainer);
  const categorias = ["anime", "manga", "peliculas", "series"];
  for (let categoria of categorias) {
    const items = await cargarItemsPorCategoria(categoria);  // Usamos la función para obtener los datos
    const carrusel = crearCarrusel(categoria, items);  // Pasamos la categoría y los items al carrusel
    main.appendChild(carrusel);  // Añadimos el carrusel a la sección principal
  }
});