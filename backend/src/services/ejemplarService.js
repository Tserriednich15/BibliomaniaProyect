import Ejemplar from "../models/ejemplar.js";

class EjemplarService {
  static async obtenerTodos() {
    try {
      const ejemplares = await Ejemplar.getAll();
      return { success: true, data: ejemplares };
    } catch (error) {
      console.error("Error en servicio al obtener ejemplares:", error);
      throw new Error("Error al obtener los ejemplares.");
    }
  }

  static async obtenerDisponibles() {
    try {
      const ejemplares = await Ejemplar.findAllDisponibles();
      return { success: true, data: ejemplares };
    } catch (error) {
      console.error("Error en servicio al obtener ejemplares disponibles:", error);
      throw new Error("Error al obtener los ejemplares disponibles.");
    }
  }

  static async obtenerPorId(id) {
    try {
      const ejemplar = await Ejemplar.getById(id);
      if (!ejemplar) {
        return { success: false, code: 404, message: "Ejemplar no encontrado." };
      }
      return { success: true, data: ejemplar };
    } catch (error) {
      throw new Error("Error al obtener el ejemplar.");
    }
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
  static async buscarDisponibles(query) {
    try {
      const ejemplares = await Ejemplar.buscarDisponiblesPorTitulo(query);
      return { success: true, data: ejemplares };
    } catch (error) {
      console.error("Error en servicio al buscar ejemplares disponibles:", error);
      throw new Error("Error al buscar los ejemplares disponibles.");
    }
  }
}

export default EjemplarService;