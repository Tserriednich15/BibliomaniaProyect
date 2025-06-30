import connection from "../utils/db.js";
class Editorial {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM editoriales");
    return rows;
  }
  static async findById(id) {
    const [rows] = await connection.query("SELECT * FROM editoriales WHERE id = ?", [id]);
    return rows[0];
  }
  static async create(data) {
    const { nombre, pais, fundacion, sitio_web, contacto_email } = data;
    const [result] = await connection.query(
      `INSERT INTO editoriales (nombre, pais, fundacion, sitio_web, contacto_email) VALUES (?, ?, ?, ?, ?)`,
      [nombre, pais, fundacion, sitio_web, contacto_email]
    );
    return result.insertId;
  }
  static async update(id, data) {
    const { nombre, pais, fundacion, sitio_web, contacto_email } = data;
    await connection.query(
      `UPDATE editoriales SET nombre = ?, pais = ?, fundacion = ?, sitio_web = ?, contacto_email = ? WHERE id = ?`,
      [nombre, pais, fundacion, sitio_web, contacto_email, id]
    );
  }
  static async delete(id) {
    await connection.query("DELETE FROM editoriales WHERE id = ?", [id]);
  }
  static async countLibros(editorialId) {
    const [rows] = await connection.query("SELECT COUNT(*) as count FROM libros WHERE editorial_id = ?", [editorialId]);
    return rows[0].count;
  }
}
export default Editorial;