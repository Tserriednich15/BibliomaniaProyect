import connection from "../utils/db.js";

class Autor {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM autores");
    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query("SELECT * FROM autores WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = data;
    const [result] = await connection.query(
      `INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web) VALUES (?, ?, ?, ?, ?)`,
      [nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = data;
    await connection.query(
      `UPDATE autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ?, biografia = ?, sitio_web = ? WHERE id = ?`,
      [nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web, id]
    );
  }

  static async delete(id) {
    await connection.query("DELETE FROM autores WHERE id = ?", [id]);
  }

  static async countLibros(autorId) {
    const [rows] = await connection.query(
      "SELECT COUNT(*) AS count FROM libros WHERE autor_id = ?",
      [autorId]
    );
    return rows[0].count;
  }

}

export default Autor;