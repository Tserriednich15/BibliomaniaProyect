import connection from "../utils/db.js";

class Prestamo {
  
  static async getAllActivos() {
    const query = `
      SELECT 
        p.id, 
        p.fecha_prestamo, 
        p.fecha_vencimiento,
        p.ejemplar_id,
        l.titulo AS libro_titulo,
        CONCAT(v.nombre, ' ', v.apellido) AS visitante_nombre
      FROM prestamos AS p
      JOIN ejemplares AS e ON p.ejemplar_id = e.id
      JOIN libros AS l ON e.libro_id = l.id
      JOIN visitantes AS v ON p.visitante_id = v.id
      WHERE p.estado = 'activo'
      ORDER BY p.fecha_prestamo DESC;
    `;
    const [rows] = await connection.query(query);
    return rows;
  }

  static async findById(id, conn = connection) {
    const [rows] = await conn.query("SELECT * FROM prestamos WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async create({ ejemplar_id, visitante_id, dias_prestamo = 15 }, conn = connection) {
    const query = `
      INSERT INTO prestamos (ejemplar_id, visitante_id, fecha_prestamo, fecha_vencimiento, estado) 
      VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? DAY), 'activo')
    `;
    const [result] = await conn.query(query, [ejemplar_id, visitante_id, dias_prestamo]);
    return result.insertId;
  }

  static async marcarComoDevuelto(id, conn = connection) {
    const [result] = await conn.query(
      "UPDATE prestamos SET estado = 'devuelto' WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export default Prestamo;