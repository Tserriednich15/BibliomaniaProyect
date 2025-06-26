import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

async function eliminarCategoria(categoriaId) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, ¡eliminar!',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/categorias/${categoriaId}`, { method: 'DELETE' });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      Swal.fire('¡Eliminada!', 'La categoría ha sido eliminada.', 'success');
      
      document.querySelector(`#categoria_row_${categoriaId}`).remove();

    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      Swal.fire('Error', error.message, 'error');
    }
  }
}

export default eliminarCategoria;