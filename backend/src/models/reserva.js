import connection from "../utils/db.js";

class Reserva {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM reservas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM reservas WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { ejemplar_id, visitante_id, fecha_reserva, estado } = data;
    const [result] = await connection.query(
      "INSERT INTO reservas (ejemplar_id, visitante_id, fecha_reserva, estado) VALUES (?, ?, ?, ?)",
      [ejemplar_id, visitante_id, fecha_reserva, estado]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { ejemplar_id, visitante_id, fecha_reserva, estado } = data;
    await connection.query(
      `UPDATE reservas 
       SET ejemplar_id = ?, visitante_id = ?, fecha_reserva = ?, estado = ? 
       WHERE id = ?`,
      [ejemplar_id, visitante_id, fecha_reserva, estado, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await connection.query("DELETE FROM reservas WHERE id = ?", [id]);
    return { id };
  }
}

export default Reserva;