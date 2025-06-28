import { manejarEliminacion } from '../../helpers/delete_helper.js';

export function eliminarCategoria(categoriaId) {
  manejarEliminacion({
    id: categoriaId,
    endpoint: 'categorias',
    nombre: 'categoría',
    filaId: `categoria_row_${categoriaId}`
  });
}