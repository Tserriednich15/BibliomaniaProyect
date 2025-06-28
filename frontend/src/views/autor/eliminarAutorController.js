import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarAutor(autorId) {
  manejarEliminacion({
    id: autorId,
    endpoint: 'autores',
    nombre: 'autor',
    filaId: `autor_row_${autorId}`
  });
}