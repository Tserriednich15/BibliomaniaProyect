import LibroService from "../services/libroService.js";
import ResponseProvider from "../providers/responseProvider.js";

class LibroController {
  static async listarLibros(req, res) {
    try {
      const result = await LibroService.listarTodos();
      return ResponseProvider.success(res, result.data, "Libros listados");
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async obtenerLibroPorId(req, res) {
    try {
      const { id } = req.params;
      const result = await LibroService.obtenerPorId(id);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, result.data, "Libro encontrado");
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async crearLibro(req, res) {
    try {
      const result = await LibroService.crear(req.body);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, result.data, result.message, 201);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async actualizarLibro(req, res) {
    try {
      const { id } = req.params;
      const result = await LibroService.actualizar(id, req.body);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, null, result.message);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }

  static async eliminarLibro(req, res) {
    try {
      const { id } = req.params;
      const result = await LibroService.eliminar(id);
      if (!result.success) {
        return ResponseProvider.error(res, result.message, result.code);
      }
      return ResponseProvider.success(res, null, result.message);
    } catch (error) {
      return ResponseProvider.error(res, error.message, 500);
    }
  }
}

export default LibroController;