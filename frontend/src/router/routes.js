import loadView from '../helpers/loadView.js';
import loginController from '../views/autenticacion/loginController.js';
// import registroController from '../views/autenticacion/registroController.js';
import menuController from '../views/visitantes/menuController.js';
import autoresController from '../views/autores/autoresController.js';
import librosController from '../views/libros/libroController.js';

const routes = {
  '/': {
    template: 'src/views/autenticacion/login.html',
    controller: loginController
  },

  'login': {
    template: 'src/views/autenticacion/login.html',
    controller: loginController
  },

  'registro': {
    template: 'src/views/autenticacion/registro.html',
    // controller: registroController
  },

  'menu': {
    template: 'src/views/visitantes/menu.html',
    controller: menuController,
    protected: true
  },
  'autores': {
    template: 'src/views/autores/autores.html',
    controller: autoresController,
    protected: true
  },
  'libros': {
    template: 'src/views/libros/libros.html',
    controller: librosController,
    protected: true
  },

  'editar_autor/:id': { template: 'src/views/autores/editar.html', /*controller: editarAutorController,*/ protected: true }
};

const matchRoute = (hash) => {
  if (hash === '' || hash === '/') {
    return [routes['/'], {}];
  }
  const arreglo = hash.split('/');
  for (const routePath in routes) {
    const routeParts = routePath.split('/');
    if (routeParts.length !== arreglo.length) continue;
    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = arreglo[i];
        return true;
      }
      return part === arreglo[i];
    });
    if (isMatch) {
      return [routes[routePath], params];
    }
  }
  return [null, null];
};

async function router(app) {
  const hash = location.hash.slice(1);
  const [route, params] = matchRoute(hash);

  if (!route) {
    app.innerHTML = '<h2>Error 404: Página no encontrada</h2>';
    return;
  }

  if (route.protected && !localStorage.getItem('accessToken')) {
    location.hash = '#login';
    return;
  }

  await loadView(app, route.template);

  if (route.controller) {
    route.controller(params);
  }
}

export default router;
