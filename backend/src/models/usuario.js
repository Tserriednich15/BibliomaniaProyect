import connection from "../utils/db.js";
import bcrypt from 'bcrypt';
class Usuario {
  static async findAll() {
    const query = `
      SELECT u.id, u.usuario, r.nombre AS rol
      FROM usuarios AS u
      JOIN roles AS r ON u.rol_id = r.id
      ORDER BY u.id ASC;
    `;
    const [rows] = await connection.query(query);
    return rows;
  }
  static async create(data) {
    const { usuario, contrasena, rol_id } = data;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
    
    const [result] = await connection.query(
      "INSERT INTO usuarios (usuario, contrasena, rol_id) VALUES (?, ?, ?)",
      [usuario, hashedPassword, rol_id]
    );
    return { id: result.insertId, usuario, rol_id };
  }
  static async findByUsername(username) {
    const [rows] = await connection.query("SELECT * FROM usuarios WHERE usuario = ?", [username]);
    return rows[0];
  }
  static async delete(id) {
    // Para evitar que el admin se elimine a sí mismo
    if (id === 1) {
        throw new Error("No se puede eliminar al administrador principal.");
    }
    const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result.affectedRows;
  }
}
export default Usuario;