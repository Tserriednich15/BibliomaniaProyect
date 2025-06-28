import fetchWithAuth from '../../helpers/fetchWithAuth.js';
import { mostrarExito, mostrarError, mostrarConfirmacion } from '../../helpers/notificaciones_helper.js';

async function eliminarAutor(autorId) {
  const confirmado = await mostrarConfirmacion('¿Eliminar Autor?', 'No podrás recuperar los datos del autor.');
  
  if (confirmado) {
    try {
      const request = await fetchWithAuth(`http://localhost:3000/api/autores/${autorId}`, { method: 'DELETE' });
      const responseData = await request.json();
      if (!request.ok) throw new Error(responseData.message);
      
      await mostrarExito('¡Eliminado!', 'El autor ha sido eliminado con éxito.');
      document.querySelector(`#autor_row_${autorId}`).remove();
    } catch (error) {
      console.error("Error al eliminar autor:", error);
      mostrarError('Error al Eliminar', error.message);
    }
  }
}

export default eliminarAutor;