import './CSS/styles.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router/routes.js';
import crearHeader from './components/header.js';
// import crearFooter from './components/footer.js'; // Descomenta si tienes un footer

const appContainer = document.querySelector("#app");
const headerContainer = document.querySelector("#header");

const startApp = () => {
  // Limpiamos el header anterior y creamos uno nuevo y actualizado
  headerContainer.innerHTML = '';
  headerContainer.appendChild(crearHeader());
  
  // El router se encarga del contenido principal en #app
  router(appContainer);
};

// --- ARRANQUE DE LA APLICACIÓN ---
// Llamamos a startApp en la carga inicial y en cada cambio de navegación
window.addEventListener('hashchange', startApp);
window.addEventListener('DOMContentLoaded', startApp);