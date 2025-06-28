// frontend/src/helpers/notificaciones_helper.js
import Swal from 'sweetalert2';

/**
 * Muestra una notificación de éxito estándar.
 * @param {string} title - El título de la alerta.
 * @param {string} text - El texto del mensaje.
 */
export function mostrarExito(title, text) {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    timer: 2000,
    timerProgressBar: true
  });
}

/**
 * Muestra una notificación de error estándar.
 * @param {string} title - El título del error.
 * @param {string} text - El texto del mensaje de error.
 */
export function mostrarError(title, text) {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text
  });
}

/**
 * Muestra un diálogo de confirmación para acciones destructivas.
 * @param {string} title - El título de la confirmación.
 * @param {string} text - El texto de advertencia.
 * @returns {Promise<boolean>} - Resuelve a true si el usuario confirma, false si cancela.
 */
export async function mostrarConfirmacion(title = '¿Estás seguro?', text = 'Esta acción no se puede revertir.') {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, ¡continuar!',
    cancelButtonText: 'Cancelar'
  });
  return result.isConfirmed;
}