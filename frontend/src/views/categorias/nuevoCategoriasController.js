import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function nuevoCategoriaController() {
  document.querySelector('#form_title').textContent = "Nueva Categoría";
  document.querySelector('#submit_btn').textContent = "Guardar Categoría";

  const form = document.querySelector("#categoria_form");
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const categoriaData = Object.fromEntries(formData.entries());

    if (!categoriaData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre de la categoría es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth("http://localhost:3000/api/categorias", {
        method: 'POST',
        body: JSON.stringify(categoriaData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      await Swal.fire('¡Éxito!', 'Categoría creada correctamente.', 'success');
      location.hash = '#categorias';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  });
}

export default nuevoCategoriaController;