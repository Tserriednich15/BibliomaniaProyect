import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import Swal from 'sweetalert2';

async function eliminarVisitante(visitanteId) {
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
      const request = await fetchWithAuth(`http://localhost:3000/api/visitantes/${visitanteId}`, { method: 'DELETE' });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      Swal.fire('¡Eliminado!', 'El visitante ha sido eliminado.', 'success');
      
      document.querySelector(`#visitante_row_${visitanteId}`).remove();

    } catch (error) {
      console.error("Error al eliminar visitante:", error);
      Swal.fire('Error', error.message, 'error');
    }
  }
}

export default eliminarVisitante;