// src/models/devolucion.js

import connection from "../utils/db.js";

class Devolucion {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM devoluciones ORDER BY fecha_devolucion DESC");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query(
      "SELECT * FROM devoluciones WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  /**
   * Crea un nuevo registro de devolución.
   * ✨ CAMBIO CLAVE: Ahora acepta y usa el parámetro 'conn' para funcionar dentro de una transacción.
   * @param {object} data - Datos de la devolución.
   * @param {object} conn - La conexión de la transacción activa.
   */
  static async create(data, conn = connection) { // Se añade conn como parámetro
    const { prestamo_id, fecha_devolucion } = data;
    const [result] = await conn.query( // Se usa 'conn' en lugar de 'connection'
      `INSERT INTO devoluciones (prestamo_id, fecha_devolucion)
       VALUES (?, ?)`,
      [prestamo_id, fecha_devolucion]
    );
    return { id: result.insertId, ...data };
  }

  // Los métodos de update y delete no se usan en la transacción, se pueden mantener como están
  static async update(id, data) {
    const { prestamo_id, fecha_devolucion } = data;
    await connection.query(
      `UPDATE devoluciones 
       SET prestamo_id = ?, fecha_devolucion = ?
       WHERE id = ?`,
      [prestamo_id, fecha_devolucion, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await connection.query("DELETE FROM devoluciones WHERE id = ?", [id]);
    return { message: "Devolución eliminada correctamente" };
  }
}

export default Devolucion;