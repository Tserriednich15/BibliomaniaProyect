import connection from "../utils/db.js";

class Multa {
  static async getAll() {
    const query = `
      SELECT 
        m.id,
        m.monto,
        m.estado,
        m.prestamo_id,
        m.created_at,
        CONCAT(v.nombre, ' ', v.apellido) AS visitante_nombre
      FROM multas AS m
      JOIN visitantes AS v ON m.visitante_id = v.id
      ORDER BY m.estado ASC, m.created_at DESC;
    `;
    const [rows] = await connection.query(query);
    return rows;
  }
  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM multas WHERE id = ?", [id]);
    return rows[0];
  }
  static async create(data, conn = connection) {
    const { visitante_id, prestamo_id, monto, estado } = data;
    const query = `
      INSERT INTO multas (visitante_id, prestamo_id, monto, estado) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await conn.query(query, [
      visitante_id,
      prestamo_id || null,
      monto,
      estado || "pendiente",
    ]);
    return { id: result.insertId, ...data };
  }
  static async updateStatus(id, estado, conn = connection) {
    const [result] = await conn.query(
      "UPDATE multas SET estado = ? WHERE id = ?",
      [estado, id]
    );
    return result.affectedRows;
  }
}
export default Multa;
