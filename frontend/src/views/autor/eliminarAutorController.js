import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

async function eliminarAutor(autorId) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede revertir.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, ¡eliminar!',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`, { method: 'DELETE' });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      Swal.fire('¡Eliminado!', 'El autor ha sido eliminado con éxito.', 'success');
      document.querySelector(`#autor_row_${autorId}`).remove();

    } catch (error) {
      console.error("Error al eliminar autor:", error);
      Swal.fire('Error', error.message, 'error');
    }
  }
}

export default eliminarAutor;