import connection from "../utils/db.js";

class Categoria {

  static async getAll() {
    const [rows] = await connection.query("SELECT * FROM categorias ORDER BY nombre ASC");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ nombre, descripcion }) {
    const [result] = await connection.query(
      "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
      [nombre, descripcion || null]
    );
    return { id: result.insertId, nombre, descripcion };
  }

  static async update(id, { nombre, descripcion }) {
    const [result] = await connection.query(
      "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
      [nombre, descripcion, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default Categoria;