import fetchWithAuth from './fetchWithAuth.js';
import { mostrarExito, mostrarError, mostrarConfirmacion } from './notificaciones_helper.js';

export async function manejarEliminacion({ id, endpoint, nombre, filaId }) {
  const confirmado = await mostrarConfirmacion(
    `¿Eliminar ${nombre}?`,
    `Estás a punto de eliminar el ${nombre} con ID ${id}. ¿Deseas continuar?`
  );

  if (!confirmado) return;

  try {
    const request = await fetchWithAuth(`http://localhost:3000/api/${endpoint}/${id}`, {
      method: 'DELETE'
    });
    
    const responseData = await request.json();
    if (!request.ok) throw new Error(responseData.message || 'Error en el servidor.');

    await mostrarExito('¡Eliminado!', `El ${nombre} ha sido eliminado correctamente.`);
    
    const fila = document.querySelector(`#${filaId}`);
    if (fila) fila.remove();

  } catch (error) {
    console.error(`Error al eliminar ${nombre}:`, error);
    mostrarError(`Error al Eliminar`, error.message);
  }
}