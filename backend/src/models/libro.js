import connection from "../utils/db.js";

class Libro {
  static async findAll() {
    const query = `
      SELECT 
        l.id, l.titulo, l.anio_publicacion, 
        c.nombre AS categoria, 
        a.nombre AS autor, 
        e.nombre AS editorial
      FROM libros AS l
      LEFT JOIN categorias AS c ON l.categoria_id = c.id
      LEFT JOIN autores AS a ON l.autor_id = a.id
      LEFT JOIN editoriales AS e ON l.editorial_id = e.id
      ORDER BY l.titulo ASC;
    `;
    const [rows] = await connection.query(query);
    return rows;
  }
  static async findById(id) {
    const query = `
      SELECT l.* FROM libros AS l
      WHERE l.id = ?;
    `;
    const [rows] = await connection.query(query, [id]);
    return rows[0] || null;
  }
  static async create(libroData, conn = connection) { // Acepta 'conn' como parámetro
    const {
      titulo, anio_publicacion, categoria_id, autor_id, editorial_id
    } = libroData;

    const query = `
      INSERT INTO libros (titulo, anio_publicacion, categoria_id, autor_id, editorial_id) 
      VALUES (?, ?, ?, ?, ?);
    `;
    
    // Usa 'conn' para la consulta, no la conexión global
    const [result] = await conn.query(query, [
      titulo, anio_publicacion, categoria_id, autor_id, editorial_id
    ]);
    
    // Devolvemos solo el ID, que es lo que el servicio necesita para crear el ejemplar
    return result.insertId;
  }
  static async update(id, libroData) {
    const {
      titulo, anio_publicacion, categoria_id, autor_id, editorial_id
    } = libroData;

    const query = `
      UPDATE libros SET 
        titulo = ?, anio_publicacion = ?, categoria_id = ?, 
        autor_id = ?, editorial_id = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?;
    `;
    const [result] = await connection.query(query, [
      titulo, anio_publicacion, categoria_id, autor_id, editorial_id, id
    ]);
    return result.affectedRows;
  }
  static async delete(id) {
    const [result] = await connection.query("DELETE FROM libros WHERE id = ?", [id]);
    return result.affectedRows;
  }
}
export default Libro;