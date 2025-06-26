import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function nuevoEditorialController() {
  document.querySelector('#form_title').textContent = "Nueva Editorial";
  document.querySelector('#submit_btn').textContent = "Guardar Editorial";

  const form = document.querySelector("#editorial_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const editorialData = Object.fromEntries(formData.entries());

    if (!editorialData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre de la editorial es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/editoriales", {
        method: 'POST',
        body: JSON.stringify(editorialData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await Swal.fire('¡Éxito!', 'Editorial creada correctamente.', 'success');
      location.hash = '#editoriales';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  });
}

export default nuevoEditorialController;