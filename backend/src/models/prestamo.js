import connection from "../utils/db.js";

class Prestamo {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM prestamos");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM prestamos WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { ejemplar_id, fecha_prestamo, fecha_devolucion, visitante_id } = data;
    const [result] = await connection.query(
      `INSERT INTO prestamos (ejemplar_id, fecha_prestamo, fecha_devolucion, visitante_id)
       VALUES (?, ?, ?, ?)`,
      [ejemplar_id, fecha_prestamo, fecha_devolucion, visitante_id]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { ejemplar_id, fecha_prestamo, fecha_devolucion, visitante_id } = data;
    await connection.query(
      `UPDATE prestamos
       SET ejemplar_id = ?, fecha_prestamo = ?, fecha_devolucion = ?, visitante_id = ?
       WHERE id = ?`,
      [ejemplar_id, fecha_prestamo, fecha_devolucion, visitante_id, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await connection.query("DELETE FROM prestamos WHERE id = ?", [id]);
  }
}

export default Prestamo;
