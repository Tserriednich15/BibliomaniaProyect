import Libro from "../models/libro.js";
import connection from "../utils/db.js"; 
import Ejemplar from "../models/ejemplar.js";
class LibroService {
  static async listarTodos() {
    try {
      const libros = await Libro.findAll();
      return { success: true, data: libros };
    } catch (error) {
      console.error("Error en servicio al listar libros:", error);
      throw new Error("Error interno al obtener los libros.");
    }
  }
  static async obtenerPorId(id) {
    try {
      const libro = await Libro.findById(id);
      if (!libro) {
        return { success: false, code: 404, message: "Libro no encontrado." };
      }
      return { success: true, data: libro };
    } catch (error) {
      console.error("Error en servicio al obtener libro por ID:", error);
      throw new Error("Error interno al buscar el libro.");
    }
  }
  static async crear(libroData) {
    const conn = await connection.getConnection(); 
    try {
      await conn.beginTransaction();

      const nuevoLibroId = await Libro.create(libroData, conn);
      
      const datosEjemplar = {
        libro_id: nuevoLibroId,
        estado: 'disponible'
      };

      await Ejemplar.create(datosEjemplar, conn);

      await conn.commit();
      return { success: true, data: { id: nuevoLibroId }, message: "Libro y primer ejemplar creados." };

    } catch (error) {
      await conn.rollback();
      console.error("Error al crear libro y ejemplar:", error);
      throw new Error("Error en el servicio al crear el libro.");
    } finally {
      conn.release();
    }
  }
  static async actualizar(id, datosLibro) {
    try {
      const affectedRows = await Libro.update(id, datosLibro);
      if (affectedRows === 0) {
        return { success: false, code: 404, message: "Libro no encontrado o sin cambios para actualizar." };
      }
      return { success: true, message: "Libro actualizado exitosamente." };
    } catch (error) {
      console.error("Error en servicio al actualizar libro:", error);
      throw new Error("Error interno al actualizar el libro.");
    }
  }
  static async eliminar(id) {
    try {
      const libroExistente = await Libro.findById(id);
      if (!libroExistente) {
        return { success: false, code: 404, message: "Libro no encontrado para eliminar." };
      }

      const ejemplarCount = await Libro.countEjemplares(id);

      if (ejemplarCount > 0) {
        return {
          success: false,
          code: 409,
          message: `No se puede eliminar el libro porque existen ${ejemplarCount} ejemplare(s) asociados.`
        };
      }

      await Libro.delete(id);
      return { success: true, message: "Libro eliminado exitosamente." };
      
    } catch (error) {
      console.error("Error en servicio al eliminar libro:", error);
      throw new Error("Error interno al eliminar el libro.");
    }
  }
}
export default LibroService;