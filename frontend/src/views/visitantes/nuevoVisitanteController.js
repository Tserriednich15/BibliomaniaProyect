import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioVisitante } from '../../helpers/validacion_helper.js';

function nuevoVisitanteController() {
  document.querySelector('#form_title').textContent = "Nuevo Visitante";
  document.querySelector('#submit_btn').textContent = "Guardar Visitante";
  
  const form = document.querySelector("#visitante_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Llama a la nueva función de validación específica para visitantes
    if (!validarFormularioVisitante(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }

    const formData = new FormData(form);
    const visitanteData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/visitantes", {
        method: 'POST',
        body: JSON.stringify(visitanteData)
      });
  
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await mostrarExito('¡Éxito!', 'Visitante creado correctamente.');
      location.hash = '#visitantes';
    } catch (error) {
      mostrarError('Error al Crear', error.message);
    }
  });
}

export default nuevoVisitanteController;