// src/models/categoria.js
import connection from "../utils/db.js";

/**
 * Clase que representa el modelo de datos para las Categorías.
 * Se encarga de todas las operaciones directas con la base de datos.
 */
class Categoria {
  /**
   * Obtiene todas las categorías.
   * @returns {Promise<Array>} Un arreglo de objetos de categoría.
   */
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM categorias ORDER BY nombre ASC");
    return rows;
  }

  /**
   * Obtiene una categoría por su ID.
   * @param {number} id - El ID de la categoría a buscar.
   * @returns {Promise<Object|null>} El objeto de la categoría o null si no se encuentra.
   */
  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return rows[0] || null;
  }

  /**
   * Crea una nueva categoría.
   * @param {Object} data - Los datos de la categoría.
   * @param {string} data.nombre - El nombre de la categoría.
   * @param {string} [data.descripcion] - La descripción opcional.
   * @returns {Promise<Object>} El objeto de la categoría recién creada.
   */
  static async create({ nombre, descripcion }) {
    const [result] = await connection.query(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion || null]
    );
    return { id: result.insertId, nombre, descripcion };
  }

  /**
   * Actualiza una categoría existente.
   * @param {number} id - El ID de la categoría a actualizar.
   * @param {Object} data - Los nuevos datos para la categoría.
   * @returns {Promise<Object>} El objeto con los datos actualizados.
   */
  static async update(id, { nombre, descripcion }) {
    const [result] = await connection.query(
      "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
      [nombre, descripcion, id]
    );
    // Retornamos la cantidad de filas afectadas para verificar si la actualización fue exitosa.
    return result.affectedRows;
  }

  /**
   * Elimina una categoría por su ID.
   * @param {number} id - El ID de la categoría a eliminar.
   * @returns {Promise<number>} La cantidad de filas eliminadas.
   */
  static async delete(id) {
    const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default Categoria;