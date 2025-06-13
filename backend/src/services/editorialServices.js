import Editorial from "../models/editorial.js";

class EditorialService {
  static async obtenerTodas() {
    return await Editorial.findAll();
  }

  static async obtenerPorId(id) {
    return await Editorial.findById(id);
  }

  static async crearEditorial(data) {
    return await Editorial.create(data);
  }

  static async actualizarEditorial(id, data) {
    return await Editorial.update(id, data);
  }

  static async eliminarEditorial(id) {
    return await Editorial.delete(id);
  }
}

export default EditorialService;