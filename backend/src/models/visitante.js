import connection from "../utils/db.js";

class Visitante {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM visitantes");
    return rows;
  }

  static async findById(id) {
    const [rows] = await connection.query("SELECT * FROM visitantes WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { cedula, nombre, apellido, telefono, correo } = data;
    const [result] = await connection.query(
      `INSERT INTO visitantes (cedula, nombre, apellido, telefono, correo) VALUES (?, ?, ?, ?, ?)`,
      [cedula, nombre, apellido, telefono, correo]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { cedula, nombre, apellido, telefono, correo } = data;
    await connection.query(
      `UPDATE visitantes SET cedula = ?, nombre = ?, apellido = ?, telefono = ?, correo = ? WHERE id = ?`,
      [cedula, nombre, apellido, telefono, correo, id]
    );
  }

  static async delete(id) {
    await connection.query("DELETE FROM visitantes WHERE id = ?", [id]);
  }
}

export default Visitante;
