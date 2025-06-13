import connection from "../utils/db.js";

class Multa {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM multas");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM multas WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { visitante_id, monto, estado } = data;
    const [result] = await connection.query(
      "INSERT INTO multas (visitante_id, monto, estado) VALUES (?, ?, ?)",
      [visitante_id, monto, estado || "pendiente"]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { visitante_id, monto, estado } = data;
    await connection.query(
      "UPDATE multas SET visitante_id = ?, monto = ?, estado = ? WHERE id = ?",
      [visitante_id, monto, estado, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await connection.query("DELETE FROM multas WHERE id = ?", [id]);
    return { id };
  }
}

export default Multa;