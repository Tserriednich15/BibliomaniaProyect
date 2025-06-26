import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function editarEditorialController(params) {
  const editorialId = params.id;
  if (!editorialId) {
    location.hash = '#editoriales';
    return;
  }

  const form = document.querySelector("#editorial_form");
  if (!form) return;

  const loadEditorialData = async () => {
    try {
      document.querySelector('#form_title').textContent = "Editando Editorial...";
      const request = await fetchWithAuth(`http://localhost:3000/api/editoriales/${editorialId}`);
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      const editorial = responseData.data;
      if (!editorial) throw new Error("No se recibieron datos de la editorial.");

      document.querySelector("#nombre").value = editorial.nombre || '';
      document.querySelector("#pais").value = editorial.pais || '';
      document.querySelector("#fundacion").value = editorial.fundacion || '';
      document.querySelector("#sitio_web").value = editorial.sitio_web || '';
      document.querySelector("#contacto_email").value = editorial.contacto_email || '';
      
      document.querySelector("#form_title").textContent = "Editar Editorial";
      document.querySelector("#submit_btn").textContent = "Actualizar Editorial";
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
      location.hash = '#editoriales';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const editorialData = Object.fromEntries(formData.entries());

    if (!editorialData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/editoriales/${editorialId}`, {
        method: 'PUT',
        body: JSON.stringify(editorialData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await Swal.fire('¡Éxito!', 'Editorial actualizada correctamente.', 'success');
      location.hash = '#editoriales';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadEditorialData();
}

export default editarEditorialController;