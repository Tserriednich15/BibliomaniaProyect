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
    const items = await cargarItemsPorCategoria(categoria); // array de objetos con info
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
  
    const carrusel = crearCarrusel(categoria, cards); // ✅ ahora le pasamos categoría y array de elementos HTML
    main.appendChild(carrusel);
  }
  
});