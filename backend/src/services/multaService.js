import Multa from "../models/multa.js";

class MultaService {
  static async obtenerTodos() {
    return await Multa.getAll();
  }

  static async obtenerPorId(id) {
    return await Multa.getById(id);
  }

  static async crear(data) {
    return await Multa.create(data);
  }

  static async actualizar(id, data) {
    return await Multa.update(id, data);
  }

  static async eliminar(id) {
    return await Multa.delete(id);
  }
}

export default MultaService;