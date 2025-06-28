import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarEditorial(editorialId) {
  manejarEliminacion({
    id: editorialId,
    endpoint: 'editoriales',
    nombre: 'editorial',
    filaId: `editorial_row_${editorialId}`
  });
}