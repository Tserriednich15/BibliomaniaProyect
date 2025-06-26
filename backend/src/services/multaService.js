import Multa from "../models/multa.js";
class MultaService {
  static async obtenerTodas() {
    try {
      const multas = await Multa.getAll();
      return { success: true, data: multas };
    } catch (error) {
      console.error("Error en servicio al obtener multas:", error);
      return { success: false, message: "Error interno al obtener las multas", code: 500 };
    }
  }
  static async pagarMulta(multaId) {
    try {
      const affectedRows = await Multa.updateStatus(multaId, 'pagada');
      if (affectedRows === 0) {
        return { success: false, code: 404, message: "Multa no encontrada para actualizar." };
      }
      return { success: true, message: "Multa marcada como pagada." };
    } catch (error) {
      console.error("Error en servicio al pagar multa:", error);
      return { success: false, message: "Error interno al pagar la multa", code: 500 };
    }
  }
}
export default MultaService;