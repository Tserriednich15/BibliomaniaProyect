import Libro from "../models/libro.js";

class LibroService {
  static async listarLibros() {
    try {
      const libros = await Libro.findAll();
      return { code: 200, data: libros };
    } catch (error) {
      console.error("Error al listar libros:", error);
      return { code: 500, message: "Error interno al obtener los libros" };
    }
  }

  static async obtenerLibroPorId(id) {
    try {
      const libro = await Libro.findById(id);
      if (!libro) {
        return { code: 404, message: "Libro no encontrado" };
      }
      return { code: 200, data: libro };
    } catch (error) {
      console.error("Error al buscar libro:", error);
      return { code: 500, message: "Error interno al buscar el libro" };
    }
  }

  static async crearLibro(datosLibro) {
    try {
      const nuevoLibro = await Libro.create(datosLibro);
      return { code: 201, message: "Libro creado exitosamente", data: nuevoLibro };
    } catch (error) {
      console.error("Error al crear libro:", error);
      return { code: 500, message: "Error interno al crear el libro" };
    }
  }

  static async actualizarLibro(id, datosLibro) {
    try {
      const actualizado = await Libro.update(id, datosLibro);
      if (!actualizado) {
        return { code: 404, message: "Libro no encontrado o sin cambios" };
      }
      return { code: 200, message: "Libro actualizado correctamente" };
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      return { code: 500, message: "Error interno al actualizar el libro" };
    }
  }

  static async eliminarLibro(id) {
    try {
      const eliminado = await Libro.delete(id);
      if (!eliminado) {
        return { code: 404, message: "Libro no encontrado para eliminar" };
      }
      return { code: 200, message: "Libro eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      return { code: 500, message: "Error interno al eliminar el libro" };
    }
  }
}

export default LibroService;