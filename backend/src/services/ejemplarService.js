import Ejemplar from "../models/ejemplar.js";


class EjemplarService {
  static async obtenerTodos() {
    return await Ejemplar.getAll();
  }

  static async obtenerPorId(id) {
    return await Ejemplar.getById(id);
  }

  static async crear(data) {
    return await Ejemplar.create(data);
  }

  static async actualizar(id, data) {
    return await Ejemplar.update(id, data);
  }

  static async eliminar(id) {
    return await Ejemplar.delete(id);
  }
}

export default EjemplarService;