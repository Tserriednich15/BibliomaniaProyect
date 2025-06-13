import Devolucion from "../models/devolucion.js";

class DevolucionService {
  static async obtenerTodos() {
    return await Devolucion.getAll();
  }

  static async obtenerPorId(id) {
    return await Devolucion.getById(id);
  }

  static async crear(data) {
    return await Devolucion.create(data);
  }

  static async actualizar(id, data) {
    return await Devolucion.update(id, data);
  }

  static async eliminar(id) {
    return await Devolucion.delete(id);
  }
}

export default DevolucionService;