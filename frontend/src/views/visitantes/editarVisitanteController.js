import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioVisitante } from '../../helpers/validacion_helper.js';

function editarVisitanteController(params) {
  const visitanteId = params.id;
  if (!visitanteId) {
    location.hash = '#visitantes';
    return;
  }

  const form = document.querySelector("#visitante_form");
  if (!form) return;

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Llama a la nueva función de validación específica para visitantes
    if (!validarFormularioVisitante(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }

    const formData = new FormData(form);
    const visitanteData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/visitantes/${visitanteId}`, {
        method: 'PUT',
        body: JSON.stringify(visitanteData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await mostrarExito('¡Éxito!', 'Visitante actualizado correctamente.');
      location.hash = '#visitantes';
    } catch (error) {
      mostrarError('Error al Actualizar', error.message);
    }
  };

  const loadVisitanteData = async () => {
    try {
      document.querySelector('#form_title').textContent = "Editando Visitante...";
      const request = await fetchWithAuth(`http://localhost:3000/api/visitantes/${visitanteId}`);
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      const visitante = responseData.data;
      if (!visitante) throw new Error("No se recibieron datos del visitante.");

      document.querySelector("#cedula").value = visitante.cedula || '';
      document.querySelector("#nombre").value = visitante.nombre || '';
      document.querySelector("#apellido").value = visitante.apellido || '';
      document.querySelector("#correo").value = visitante.correo || '';
      document.querySelector("#telefono").value = visitante.telefono || '';
      
      document.querySelector("#form_title").textContent = "Editar Visitante";
      document.querySelector("#submit_btn").textContent = "Actualizar Visitante";
    } catch (error) {
      mostrarError('Error al Cargar', error.message);
      location.hash = '#visitantes';
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadVisitanteData();
}

export default editarVisitanteController;