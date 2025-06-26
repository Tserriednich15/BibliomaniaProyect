import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function nuevoAutorController() {
  document.querySelector('#form_title').textContent = "Nuevo Autor";
  document.querySelector('#submit_btn').textContent = "Guardar Autor";

  const form = document.querySelector("#autor_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const autorData = Object.fromEntries(formData.entries());

    if (!autorData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre del autor es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/autores", {
        method: 'POST',
        body: JSON.stringify(autorData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await Swal.fire('¡Éxito!', 'Autor creado correctamente.', 'success');
      location.hash = '#autores';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  });
}

export default nuevoAutorController;