// src/models/categoriaModel.js
import { obtenerDatos } from "../utils/obtenerDatos.js";

export async function cargarItemsPorCategoria(categoria) {
  return await obtenerDatos(categoria);
}