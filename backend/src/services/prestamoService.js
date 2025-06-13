import Prestamo from "../models/prestamo.js"

class PrestamoService {
  static async obtenerTodos() {
    return await Prestamo.getAll();
  }

  static async obtenerPorId(id) {
    return await Prestamo.getById(id);
  }

  static async crearPrestamo(data) {
    return await Prestamo.create(data);
  }

  static async actualizarPrestamo(id, data) {
    return await Prestamo.update(id, data);
  }

  static async eliminarPrestamo(id) {
    return await Prestamo.delete(id);
  }
}

export default PrestamoService;
