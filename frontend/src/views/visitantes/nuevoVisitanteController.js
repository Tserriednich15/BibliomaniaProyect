import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function nuevoVisitanteController() {
  document.querySelector('#form_title').textContent = "Nuevo Visitante";
  document.querySelector('#submit_btn').textContent = "Guardar Visitante";

  const form = document.querySelector("#visitante_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const visitanteData = Object.fromEntries(formData.entries());

    if (!visitanteData.nombre || !visitanteData.apellido || !visitanteData.cedula) {
      return Swal.fire('Atención', 'Nombre, apellido y cédula son obligatorios.', 'warning');
    }

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/visitantes", {
        method: 'POST',
        body: JSON.stringify(visitanteData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await Swal.fire('¡Éxito!', 'Visitante creado correctamente.', 'success');
      location.hash = '#visitantes';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  });
}

export default nuevoVisitanteController;