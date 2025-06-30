import connection from "../utils/db.js";
class Visitante {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM visitantes");
    return rows;
  }
  static async findById(id) {
    const [rows] = await connection.query("SELECT * FROM visitantes WHERE id = ?", [id]);
    return rows[0];
  }
  static async create(data) {
    const { cedula, nombre, apellido, telefono, correo } = data;
    const [result] = await connection.query(
      `INSERT INTO visitantes (cedula, nombre, apellido, telefono, correo) VALUES (?, ?, ?, ?, ?)`,
      [cedula, nombre, apellido, telefono, correo]
    );
    return result.insertId;
  }
  static async update(id, data) {
    const { cedula, nombre, apellido, telefono, correo } = data;
    await connection.query(
      `UPDATE visitantes SET cedula = ?, nombre = ?, apellido = ?, telefono = ?, correo = ? WHERE id = ?`,
      [cedula, nombre, apellido, telefono, correo, id]
    );
  }
  static async delete(id) {
    await connection.query("DELETE FROM visitantes WHERE id = ?", [id]);
  }
  static async findOrCreateByDetails(visitanteData, conn = connection) {
    const { cedula, nombre, apellido, telefono, correo } = visitanteData;

    const [rows] = await conn.query("SELECT id FROM visitantes WHERE cedula = ?", [cedula]);

    if (rows.length > 0) {
      return rows[0].id;
    }

    const [result] = await conn.query(
      "INSERT INTO visitantes (cedula, nombre, apellido, telefono, correo) VALUES (?, ?, ?, ?, ?)",
      [cedula, nombre, apellido, telefono, correo]
    );

    return result.insertId;
  }
  static async countDependencies(visitanteId) {
    const [prestamos] = await connection.query("SELECT COUNT(*) as count FROM prestamos WHERE visitante_id = ? AND estado = 'activo'", [visitanteId]);
    const [multas] = await connection.query("SELECT COUNT(*) as count FROM multas WHERE visitante_id = ? AND estado = 'pendiente'", [visitanteId]);
    const [reservas] = await connection.query("SELECT COUNT(*) as count FROM reservas WHERE visitante_id = ? AND estado = 'pendiente'", [visitanteId]);

    let details = [];
    if (prestamos[0].count > 0) details.push(`${prestamos[0].count} préstamo(s) activo(s)`);
    if (multas[0].count > 0) details.push(`${multas[0].count} multa(s) pendiente(s)`);
    if (reservas[0].count > 0) details.push(`${reservas[0].count} reserva(s) activa(s)`);

    return {
      hasDependencies: details.length > 0,
      message: details.join(', ')
    };
  }
}
export default Visitante;