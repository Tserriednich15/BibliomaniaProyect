import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioCategoria } from '../../helpers/validacion_helper.js';

function nuevoCategoriaController() {
  document.querySelector('#form_title').textContent = "Nueva Categoría";
  document.querySelector('#submit_btn').textContent = "Guardar Categoría";
  
  const form = document.querySelector("#categoria_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validarFormularioCategoria(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }

    const formData = new FormData(form);
    const categoriaData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/categorias", {
        method: 'POST',
        body: JSON.stringify(categoriaData)
      });
       
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await mostrarExito('¡Éxito!', 'Categoría creada correctamente.');
      location.hash = '#categorias';
    } catch (error) {
      mostrarError('Error al Crear', error.message);
    }
  });
}

export default nuevoCategoriaController;