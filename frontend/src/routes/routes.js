// routes/routes.js
import { loadView } from "../helpers/loadView.js";

// Mapa hash → vista + JS opcional
const rutas = {
  '#login': {
    vista: 'views/autenticacion/login.html'
  },
  '#menu': {
    vista: 'views/menu/menu.html',
    script: () => import('../scripts/menu.js').then(m => m.default())
  },
  '#libros': {
    vista: 'views/libros/listado.html'
  },
  '#visitantes': {
    vista: 'views/visitantes/home.html'
  }
};

export const router = async (contenedor) => {
  const path = window.location.hash || '#menu';
  const ruta = rutas[path];

  if (!ruta) {
    await loadView('views/error/404.html', contenedor);
    return;
  }

  await loadView(ruta.vista, contenedor);

  if (ruta.script) {
    ruta.script(); // Ejecuta el script dinámico
  }
};