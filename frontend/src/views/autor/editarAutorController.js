import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function editarAutorController(params) {
  const autorId = params.id;
  if (!autorId) {
    location.hash = '#autores';
    return;
  }

  const form = document.querySelector("#autor_form");
  if (!form) return;

  const loadAutorData = async () => {
    try {
      document.querySelector('#form_title').textContent = "Editando Autor...";
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`);
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      const autor = responseData.data;
      if (!autor) throw new Error("No se recibieron datos del autor.");

      document.querySelector("#nombre").value = autor.nombre || '';
      document.querySelector("#nacionalidad").value = autor.nacionalidad || '';
      if (autor.fecha_nacimiento) {
        document.querySelector("#fecha_nacimiento").value = new Date(autor.fecha_nacimiento).toISOString().split('T')[0];
      }
      document.querySelector("#biografia").value = autor.biografia || '';
      document.querySelector("#sitio_web").value = autor.sitio_web || '';
      
      document.querySelector("#form_title").textContent = "Editar Autor";
      document.querySelector("#submit_btn").textContent = "Actualizar Autor";
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
      location.hash = '#autores';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const autorData = Object.fromEntries(formData.entries());

    if (!autorData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`, {
        method: 'PUT',
        body: JSON.stringify(autorData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await Swal.fire('¡Éxito!', 'Autor actualizado correctamente.', 'success');
      location.hash = '#autores';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadAutorData();
}

export default editarAutorController;