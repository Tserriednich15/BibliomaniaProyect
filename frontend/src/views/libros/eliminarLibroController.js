import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarLibro(libroId) {
  manejarEliminacion({
    id: libroId,
    endpoint: 'libros',
    nombre: 'libro',
    filaId: `libro_row_${libroId}`
  });
}