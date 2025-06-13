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
    return await Visitante.delete(id);
  }
}

export default VisitanteService;