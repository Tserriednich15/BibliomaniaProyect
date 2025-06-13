import connection from "../utils/db.js";

class Devolucion {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM devoluciones");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query(
      "SELECT * FROM devoluciones WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { prestamo_id, fecha_devolucion } = data;
    const [result] = await connection.query(
      `INSERT INTO devoluciones (prestamo_id, fecha_devolucion)
       VALUES (?, ?)`,
      [prestamo_id, fecha_devolucion]
    );
    return { id: result.insertId, ...data };
  }

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
