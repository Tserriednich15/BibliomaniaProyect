import loginController from '../views/autenticacion/loginController.js';
import registroController from '../views/autenticacion/registroController.js';
import menuController from '../views/visitantes/menuController.js';
import librosController from '../views/libros/librosController.js';
// import editarLibroController from '../views/libros/editarController.js';

const routes = {
  '/': {
    template: 'views/autenticacion/login.html',
    controller: loginController
  },
  'login': {
    template: 'views/autenticacion/login.html',
    controller: loginController
  },
  'registro': {
    template: 'views/autenticacion/registro.html',
    controller: registroController
  },
  'menu': {
    template: 'views/visitantes/menu.html',
    controller: menuController
  },
  'libros': {
    template: 'views/libros/listado.html',
    controller: librosController
  },
  'editarlibro/:id': {
    template: 'views/libros/editar.html',
    // controller: editarLibroController
  }
};

export const router = async (app) => {
  const hash = location.hash.slice(1) || '/';

  const [path, params] = matchRoute(hash, routes);
  const route = path ? path : routes['/'];

  if (route.protected && !localStorage.getItem('accessToken')) {
    location.hash = '#/login';
    return;
  }

  const response = await fetch(route.template);
  const html = await response.text();
  app.innerHTML = html;

  if (route.controller) {
    route.controller(params);
  }
};

const matchRoute = (hash, routes) => {
  const hashParts = hash.split('/');

  for (const routePath in routes) {
    const routeParts = routePath.split('/');
    if (routeParts.length !== hashParts.length) continue;

    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        params[paramName] = hashParts[i];
        return true;
      }
      return part === hashParts[i];
    });

    if (isMatch) {
      return [routes[routePath], params];
    }
  }
  return [null, null];
};