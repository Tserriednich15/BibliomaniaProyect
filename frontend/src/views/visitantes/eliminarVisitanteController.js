import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarVisitante(visitanteId) {
  manejarEliminacion({
    id: visitanteId,
    endpoint: 'visitantes',
    nombre: 'visitante',
    filaId: `visitante_row_${visitanteId}`
  });
}