import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarUsuario(usuarioId) {
    manejarEliminacion({
        id: usuarioId,
        endpoint: 'usuarios',
        nombre: 'usuario',
        filaId: `usuario_row_${usuarioId}`
    });
}