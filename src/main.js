import crearHeader from './components/header.js';
import crearSidebar from './components/sidebar.js';
import crearMain from './components/mainSection.js';
import crearFooter from './components/footer.js';
import crearMainTop from './components/mainTop.js';

window.addEventListener('DOMContentLoaded', () => {
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
});
