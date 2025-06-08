import { obtenerDatosPorGenero } from "../utils/obtenerDatos.js";

export async function cargarItemsPorCategoria(categoria) {
  return await obtenerDatosPorGenero(categoria);
}