import connection from "../utils/db.js";

class Ejemplar {
  static async getAll() {
    const query = `
      SELECT e.id, e.estado, l.titulo AS libro_titulo 
      FROM ejemplares AS e
      JOIN libros AS l ON e.libro_id = l.id
      ORDER BY l.titulo, e.id;
    `;
    const [rows] = await connection.query(query);
    return rows;
  }
  static async buscarDisponiblesPorTitulo(query) {
    const searchQuery = `%${query}%`;
    const sql = `
      SELECT 
        e.id,
        l.titulo
      FROM ejemplares AS e
      JOIN libros AS l ON e.libro_id = l.id
      WHERE e.estado = 'disponible' AND l.titulo LIKE ?
      ORDER BY l.titulo;
    `;
    const [rows] = await connection.query(sql, [searchQuery]);

    return rows.map(row => ({
      id: row.id,
      libro: {
        titulo: row.titulo
      }
    }));
  }
  static async getById(id, conn = connection) {
    const [rows] = await conn.query("SELECT * FROM ejemplares WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ libro_id, estado }, conn = connection) { 
    const [result] = await conn.query(
      "INSERT INTO ejemplares (libro_id, estado) VALUES (?, ?)",
      [libro_id, estado || "disponible"]
    );
    return { id: result.insertId, libro_id, estado: estado || "disponible" };
  }

  static async actualizarEstado(id, estado, conn = connection) {
    const [result] = await conn.query(
      "UPDATE ejemplares SET estado = ? WHERE id = ?",
      [estado, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await connection.query("DELETE FROM ejemplares WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default Ejemplar;