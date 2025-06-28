import Swal from 'sweetalert2';

export function mostrarExito(title, text) {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    timer: 2000,
    timerProgressBar: true
  });
}

export function mostrarError(title, text) {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text
  });
}

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