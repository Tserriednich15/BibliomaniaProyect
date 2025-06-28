import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError } from '../../helpers/notificaciones_helper.js';
import { validarFormularioCategoria } from '../../helpers/validacion_helper.js';

function editarCategoriaController(params) {
  const categoriaId = params.id;
  if (!categoriaId) {
    location.hash = '#categorias';
    return;
  }

  const form = document.querySelector("#categoria_form");
  if (!form) return;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validarFormularioCategoria(form)) {
      mostrarError('Formulario Incompleto', 'Por favor, corrige los errores señalados.');
      return;
    }

    const formData = new FormData(form);
    const categoriaData = Object.fromEntries(formData.entries());

    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/categorias/${categoriaId}`, {
        method: 'PUT',
        body: JSON.stringify(categoriaData)
      });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await mostrarExito('¡Éxito!', 'Categoría actualizada correctamente.');
      location.hash = '#categorias';
    } catch (error) {
      mostrarError('Error al Actualizar', error.message);
    }
  };

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
      mostrarError('Error al Cargar', error.message);
      location.hash = '#categorias';
    }
  };

  form.addEventListener('submit', handleUpdate);
  loadCategoriaData();
}

export default editarCategoriaController;