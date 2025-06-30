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
    const libroCount = await Editorial.countLibros(id);
    if (libroCount > 0) {
      const error = new Error(`No se puede eliminar la editorial porque tiene ${libroCount} libro(s) asociado(s).`);
      error.statusCode = 409;
      throw error;
    }
    return await Editorial.delete(id);
  }
}
export default EditorialService;