import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

function editarCategoriaController(params) {
  const categoriaId = params.id;
  if (!categoriaId) {
    location.hash = '#categorias';
    return;
  }

  const form = document.querySelector("#categoria_form");
  if (!form) return;

  const loadCategoriaData = async () => {
    try {
      document.querySelector('#form_title').textContent = "Editando Categoría...";
      const request = await fetchWithAuth(`http://localhost:3000/api/categorias/${categoriaId}`);
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);

      const categoria = responseData.data;
      if (!categoria) throw new Error("No se recibieron datos de la categoría.");

      document.querySelector("#nombre").value = categoria.nombre || '';
      document.querySelector("#descripcion").value = categoria.descripcion || '';
      
      document.querySelector("#form_title").textContent = "Editar Categoría";
      document.querySelector("#submit_btn").textContent = "Actualizar Categoría";
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
      location.hash = '#categorias';
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const categoriaData = Object.fromEntries(formData.entries());

    if (!categoriaData.nombre.trim()) {
      return Swal.fire('Atención', 'El nombre es obligatorio.', 'warning');
    }

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/categorias/${categoriaId}`, {
        method: 'PUT',
        body: JSON.stringify(categoriaData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await Swal.fire('¡Éxito!', 'Categoría actualizada correctamente.', 'success');
      location.hash = '#categorias';
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadCategoriaData();
}

export default editarCategoriaController;