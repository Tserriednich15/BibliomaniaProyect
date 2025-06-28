import connection from "../utils/db.js";

class AutorService {
    static async obtenerTodos() {
        const [rows] = await connection.query("SELECT * FROM autores");
        return rows;
    }

    static async obtenerPorId(id) {
        const [rows] = await connection.query("SELECT * FROM autores WHERE id = ?", [id]);
        return rows[0];
    }

    static async crear(datos) {
        const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = datos;
        const [result] = await connection.query(
            `INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web) 
       VALUES (?, ?, ?, ?, ?)`,
            [nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web]
        );
        return { id: result.insertId, ...datos };
    }

    static async actualizar(id, datos) {
        const { nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web } = datos;
        await connection.query(
            `UPDATE autores 
       SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ?, biografia = ?, sitio_web = ?
       WHERE id = ?`,
            [nombre, nacionalidad, fecha_nacimiento, biografia, sitio_web, id]
        );
        return { id, ...datos };
    }

    static async eliminar(id) {
        const [result] = await connection.query("DELETE FROM autores WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

export default AutorService;