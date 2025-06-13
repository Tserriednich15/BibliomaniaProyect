import connection from "../utils/db.js";

class Ejemplar {
  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM ejemplares");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM ejemplares WHERE id = ?", [id]);
    return rows[0];
  }

  static async create({ libro_id, estado }) {
    const [result] = await connection.query(
      "INSERT INTO ejemplares (libro_id, estado) VALUES (?, ?)",
      [libro_id, estado || "disponible"]
    );
    return { id: result.insertId, libro_id, estado: estado || "disponible" };
  }

  static async update(id, { libro_id, estado }) {
    await connection.query(
      "UPDATE ejemplares SET libro_id = ?, estado = ? WHERE id = ?",
      [libro_id, estado, id]
    );
    return { id, libro_id, estado };
  }

  static async delete(id) {
    await connection.query("DELETE FROM ejemplares WHERE id = ?", [id]);
    return { id };
  }
}

export default Ejemplar;