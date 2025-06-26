import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function editarVisitanteController(params) {
  const visitanteId = params.id;
  if (!visitanteId) {
    location.hash = '#visitantes';
    return;
  }

  const form = document.querySelector("#visitante_form");
  if (!form) return;

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
      Swal.fire('Error', error.message, 'error');
      location.hash = '#visitantes';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const visitanteData = Object.fromEntries(formData.entries());

    if (!visitanteData.nombre || !visitanteData.apellido || !visitanteData.cedula) {
      return Swal.fire('Atención', 'Nombre, apellido y cédula son obligatorios.', 'warning');
    }

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/visitantes/${visitanteId}`, {
        method: 'PUT',
        body: JSON.stringify(visitanteData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await Swal.fire('¡Éxito!', 'Visitante actualizado correctamente.', 'success');
      location.hash = '#visitantes';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadVisitanteData();
}

export default editarVisitanteController;