import PrestamoService from '../services/prestamoService.js';
import ResponseProvider from '../providers/responseProvider.js';
class PrestamoController {
  static async getPrestamosActivos(req, res) {
    const result = await PrestamoService.obtenerActivos();
    if (!result.success) {
      return ResponseProvider.error(res, result.message, result.code);
    }
    return ResponseProvider.success(res, result.data, result.message);
  }
  static async createPrestamo(req, res) {
    const result = await PrestamoService.crearPrestamo(req.body);
    if (!result.success) {
      return ResponseProvider.error(res, result.message, result.code);
    }
    return ResponseProvider.success(res, result.data, result.message, 201);
  }
  static async procesarDevolucion(req, res) {
    const { id } = req.params;
    const result = await PrestamoService.procesarDevolucion(id);
    
    if (!result.success) {
      return ResponseProvider.error(res, result.message, result.code);
    }
    return ResponseProvider.success(res, null, result.message);
  }
}
export default PrestamoController;