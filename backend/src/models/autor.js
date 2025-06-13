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
}

export default Autor;