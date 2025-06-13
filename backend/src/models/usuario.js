import db from "../utils/db.js";

export class Usuario {
  // Buscar usuario por nombre de usuario
  static async findByUsername(usuario) {
    const [rows] = await db.query(
      `SELECT u.*, r.nombre AS rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.usuario = ?`,
      [usuario]
    );
    return rows[0];
  }

  // Buscar usuario por ID
  static async findById(id) {
    const [rows] = await db.query(
      `SELECT u.*, r.nombre AS rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Crear nuevo usuario
  static async create(usuario, contrasena, rol_id = 2) {
    const [result] = await db.query(
      `INSERT INTO usuarios (usuario, contrasena, rol_id) VALUES (?, ?, ?)`,
      [usuario, contrasena, rol_id]
    );
    return result.insertId;
  }

  // Actualizar el refresh token
  static async updateRefreshToken(id, refreshToken) {
    await db.query(
      `UPDATE usuarios SET refresh_token = ? WHERE id = ?`,
      [refreshToken, id]
    );
  }
}
