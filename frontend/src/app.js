import './CSS/styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import router from '../src/router/routes.js';
import crearHeader from './components/header.js';
import { crearFooter } from './components/footer.js';

const appContainer = document.querySelector("#app");

const startApp = () => {
  appContainer.innerHTML = '';

  const header = crearHeader();
  const mainContent = document.createElement('main');
  mainContent.classList.add('main-content');
  const footer = crearFooter();

  appContainer.append(header, mainContent, footer);

  router(mainContent);
};

window.addEventListener('hashchange', startApp);
window.addEventListener('DOMContentLoaded', startApp);



// detallitos