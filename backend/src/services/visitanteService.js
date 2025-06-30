import Visitante from "../models/visitante.js";

class VisitanteService {
  static async obtenerTodos() {
    return await Visitante.findAll();
  }

  static async obtenerPorId(id) {
    return await Visitante.findById(id);
  }

  static async crearVisitante(data) {
    return await Visitante.create(data);
  }

  static async actualizarVisitante(id, data) {
    return await Visitante.update(id, data);
  }

  static async eliminarVisitante(id) {
    const visitanteExistente = await Visitante.findById(id);
    if (!visitanteExistente) {
      const error = new Error("Visitante no encontrado para eliminar.");
      error.statusCode = 404;
      throw error;
    }

    const dependencies = await Visitante.countDependencies(id);

    if (dependencies.hasDependencies) {
      const error = new Error(`No se puede eliminar el visitante porque tiene asociados: ${dependencies.message}.`);
      error.statusCode = 409;
      throw error;
    }

    return await Visitante.delete(id);
  }
}

export default VisitanteService;