import loginController from '../views/autenticacion/loginController.js';
import loadView from '../helpers/loadView.js';
import menuController from '../views/menu/menuController.js';
import librosController from '../views/libros/librosController.js';
import { nuevoLibroController } from '../views/libros/nuevoLibroController.js';
import { editarLibroController } from '../views/libros/editarLibroController.js';
import autorController from '../views/autor/autorController.js';
import nuevoAutorController from '../views/autor/nuevoAutorController.js';
import editarAutorController from '../views/autor/editarAutorController.js';
import categoriasController from '../views/categorias/categoriasController.js';
import nuevoCategoriaController from '../views/categorias/nuevoCategoriasController.js';
import editarCategoriaController from '../views/categorias/editarCategoriasController.js';
import editorialesController from '../views/editoriales/editorialesController.js';
import nuevoEditorialController from '../views/editoriales/nuevoEditorialController.js';
import editarEditorialController from '../views/editoriales/editarEditorialController.js';
import visitantesController from '../views/visitantes/visitantesController.js';
import nuevoVisitanteController from '../views/visitantes/nuevoVisitanteController.js';
import editarVisitanteController from '../views/visitantes/editarVisitanteController.js';
import prestamosController from '../views/prestamos/prestamosController.js';
import nuevoPrestamoController from '../views/prestamos/nuevoPrestamoController.js';
import multasController from '../views/multas/multasController.js';
import usuariosController from '../views/usuarios/usuariosController.js';
import nuevoUsuarioController from '../views/usuarios/nuevoUsuarioController.js';


const routes = {
  '/': {
    template: 'src/views/autenticacion/login.html',
    controller: loginController
  },
  'login': {
    template: 'src/views/autenticacion/login.html',
    controller: loginController
  },
  'menu': {
    template: 'src/views/menu/menu.html',
    controller: menuController,
    protected: true
  },
  'libros': {
    template: 'src/views/libros/libros.html',
    controller: librosController,
    protected: true
  },
  'nuevo_libro': {
    template: 'src/views/libros/formulario.html',
    controller: nuevoLibroController,
    protected: true
  },
  'editar_libro/:id': {
    template: 'src/views/libros/formulario.html',
    controller: editarLibroController,
    protected: true
  }, 'autores': {
    template: 'src/views/autor/autor.html',
    controller: autorController,
    protected: true
  },
  'nuevo_autor': {
    template: 'src/views/autor/formulario.html',
    controller: nuevoAutorController,
    protected: true
  },
  'editar_autor/:id': {
    template: 'src/views/autor/formulario.html',
    controller: editarAutorController,
    protected: true
  },
  'categorias': {
    template: 'src/views/categorias/categorias.html',
    controller: categoriasController,
    protected: true
  },
  'nueva_categoria': {
    template: 'src/views/categorias/formulario.html',
    controller: nuevoCategoriaController,
    protected: true
  },
  'editar_categoria/:id': {
    template: 'src/views/categorias/formulario.html',
    controller: editarCategoriaController,
    protected: true
  },
  'editoriales': {
    template: 'src/views/editoriales/editoriales.html',
    controller: editorialesController,
    protected: true
  },
  'nueva_editorial': {
    template: 'src/views/editoriales/formulario.html',
    controller: nuevoEditorialController,
    protected: true
  },
  'editar_editorial/:id': {
    template: 'src/views/editoriales/formulario.html',
    controller: editarEditorialController,
    protected: true
  },
  'visitantes': {
    template: 'src/views/visitantes/visitantes.html',
    controller: visitantesController,
    protected: true
  },
  'nuevo_visitante': {
    template: 'src/views/visitantes/formulario.html',
    controller: nuevoVisitanteController,
    protected: true
  },
  'editar_visitante/:id': {
    template: 'src/views/visitantes/formulario.html',
    controller: editarVisitanteController,
    protected: true
  },
  'prestamos': {
    template: 'src/views/prestamos/prestamos.html',
    controller: prestamosController,
    protected: true

  },
  'nuevo_prestamo': {
    template: 'src/views/prestamos/formulario.html',
    controller: nuevoPrestamoController,
    protected: true
  },
  'multas': {
    template: 'src/views/multas/multas.html',
    controller: multasController,
    protected: true
  },
  
  'nuevo_usuario': {
    template: 'src/views/usuarios/formulario.html',
    controller: nuevoUsuarioController,
    protected: true
  },
};

const matchRoute = (hash) => {
  if (hash === '' || hash === '/') return [routes['/'], {}];
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
    if (isMatch) return [routes[routePath], params];
  }
  return [null, null];
};

export const router = async (app) => {
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
};

export default router;