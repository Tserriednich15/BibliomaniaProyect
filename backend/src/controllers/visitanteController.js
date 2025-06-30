import VisitanteService from "../services/visitanteService.js";
import ResponseProvider from "../providers/responseProvider.js";
class VisitanteController {
  static async obtenerTodos(req, res) {
    try {
      const visitantes = await VisitanteService.obtenerTodos();
      return ResponseProvider.success(res, visitantes);
    } catch (error) {
      console.error("Error al obtener visitantes:", error);
      return ResponseProvider.error(res, "Error al obtener los visitantes");
    }
  }
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const visitante = await VisitanteService.obtenerPorId(id);

      if (!visitante) {
        return ResponseProvider.error(res, "Visitante no encontrado", 404);
      }

      return ResponseProvider.success(res, visitante);
    } catch (error) {
      console.error("Error al obtener el visitante:", error);
      return ResponseProvider.error(res, "Error al obtener el visitante");
    }
  }
  static async crear(req, res) {
    try {
      const { cedula, nombre, apellido, telefono, correo } = req.body;

      if (!cedula || !nombre || !apellido) {
        return ResponseProvider.error(res, "Cédula, nombre y apellido son obligatorios", 400);
      }

      const nuevoId = await VisitanteService.crearVisitante({ cedula, nombre, apellido, telefono, correo });

      return ResponseProvider.success(res, { id: nuevoId, message: "Visitante creado exitosamente" }, 201);
    } catch (error) {
      console.error("Error al crear visitante:", error);
      return ResponseProvider.error(res, "Error al crear el visitante");
    }
  }
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      const visitante = await VisitanteService.obtenerPorId(id);

      if (!visitante) {
        return ResponseProvider.error(res, "Visitante no encontrado", 404);
      }

      const { cedula, nombre, apellido, telefono, correo } = req.body;
      await VisitanteService.actualizarVisitante(id, { cedula, nombre, apellido, telefono, correo });

      return ResponseProvider.success(res, { message: "Visitante actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar visitante:", error);
      return ResponseProvider.error(res, "Error al actualizar el visitante");
    }
  }
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      const visitante = await VisitanteService.obtenerPorId(id);

      if (!visitante) {
        return ResponseProvider.error(res, "Visitante no encontrado", 404);
      }

      await VisitanteService.eliminarVisitante(id);
      return ResponseProvider.success(res, { message: "Visitante eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar visitante:", error);
      return ResponseProvider.error(res, error.message, error.statusCode || 500);
    }
  }
}
export default VisitanteController;