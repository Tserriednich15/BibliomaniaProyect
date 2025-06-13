import connection from "../utils/db.js";

class Libro {
  static async findAll() {
    const [rows] = await connection.query("SELECT * FROM libros");
    return rows;
  }

  static async findById(id) {
    const [rows] = await connection.query("SELECT * FROM libros WHERE id = ?", [id]);
    return rows[0];
  }

  static async create(libroData) {
    const {
      titulo,
      anio_publicacion,
      genero,
      cantidad_total,
      cantidad_disponible,
      categoria_id,
      autor_id,
      editorial_id
    } = libroData;

    const [result] = await connection.query(
      `INSERT INTO libros 
        (titulo, anio_publicacion, genero, cantidad_total, cantidad_disponible, categoria_id, autor_id, editorial_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        anio_publicacion,
        genero,
        cantidad_total,
        cantidad_disponible,
        categoria_id,
        autor_id,
        editorial_id
      ]
    );

    return { id: result.insertId, ...libroData };
  }

  static async update(id, libroData) {
    const {
      titulo,
      anio_publicacion,
      genero,
      cantidad_total,
      cantidad_disponible,
      categoria_id,
      autor_id,
      editorial_id
    } = libroData;

    const [result] = await connection.query(
      `UPDATE libros SET 
        titulo = ?, 
        anio_publicacion = ?, 
        genero = ?, 
        cantidad_total = ?, 
        cantidad_disponible = ?, 
        categoria_id = ?, 
        autor_id = ?, 
        editorial_id = ?, 
        updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [
        titulo,
        anio_publicacion,
        genero,
        cantidad_total,
        cantidad_disponible,
        categoria_id,
        autor_id,
        editorial_id,
        id
      ]
    );

    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await connection.query("DELETE FROM libros WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default Libro;