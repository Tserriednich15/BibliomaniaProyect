import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioAutor } from '../../helpers/validacion_helper.js';

function nuevoAutorController() {
  document.querySelector('#form_title').textContent = "Nuevo Autor";
  document.querySelector('#submit_btn').textContent = "Guardar Autor";
  
  const form = document.querySelector("#autor_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validarFormularioAutor(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }

    const formData = new FormData(form);
    const autorData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/autores", {
        method: 'POST',
        body: JSON.stringify(autorData)
      });
       
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await mostrarExito('¡Éxito!', 'Autor creado correctamente.');
      location.hash = '#autores';
    } catch (error) {
      mostrarError('Error al Crear', error.message);
    }
  });
}

export default nuevoAutorController;