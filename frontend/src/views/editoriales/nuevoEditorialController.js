import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioEditorial } from '../../helpers/validacion_helper.js';

function nuevoEditorialController() {
  document.querySelector('#form_title').textContent = "Nueva Editorial";
  document.querySelector('#submit_btn').textContent = "Guardar Editorial";

  const form = document.querySelector("#editorial_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validarFormularioEditorial(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }
    
    const formData = new FormData(form);
    const editorialData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/editoriales", {
        method: 'POST',
        body: JSON.stringify(editorialData)
      });
     
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await mostrarExito('¡Éxito!', 'Editorial creada correctamente.');
      location.hash = '#editoriales';
    } catch (error) {
      mostrarError('Error al Crear', error.message);
    }
  });
}

export default nuevoEditorialController;