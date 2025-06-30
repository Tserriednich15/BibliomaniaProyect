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
  static async findByUsername(username) {
    const query = `
      SELECT u.*, r.nombre AS rol 
      FROM usuarios AS u
      JOIN roles AS r ON u.rol_id = r.id
      WHERE u.usuario = ?
    `;
    const [rows] = await connection.query(query, [username]);
    return rows[0];
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
  static async updateRefreshToken(id, token) {
    const [result] = await connection.query(
        "UPDATE usuarios SET refresh_token = ? WHERE id = ?",
        [token, id]
    );
    return result.affectedRows;
  }
  static async delete(id) {
    if (id === 1) {
        throw new Error("No se puede eliminar al administrador principal.");
    }
    const [result] = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return result.affectedRows;
  }
  static async countPrestamos(usuarioId) {
    try {
      const [rows] = await connection.query("SELECT COUNT(*) as count FROM prestamos WHERE usuario_id = ?", [usuarioId]);
      return rows[0].count;
    } catch (error) {
      console.warn("Advertencia: No se pudo verificar los préstamos del usuario. Probablemente la columna 'usuario_id' no existe en la tabla 'prestamos'.", error.code);
      return 0; 
    }
  }
}
export default Usuario;