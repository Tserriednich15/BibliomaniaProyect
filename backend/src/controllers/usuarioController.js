import UsuarioService from "../services/usuarioService.js";
import ResponseProvider from "../providers/responseProvider.js";
import Rol from "../models/rol.js";
class UsuarioController {
  static async getAllUsuarios(req, res) {
    const result = await UsuarioService.obtenerTodos();
    if (!result.success) return ResponseProvider.error(res, result.message, result.code);
    return ResponseProvider.success(res, result.data, "Usuarios listados.");
  }
  static async createUsuario(req, res) {
    const result = await UsuarioService.crear(req.body);
    if (!result.success) return ResponseProvider.error(res, result.message, result.code);
    return ResponseProvider.success(res, result.data, result.message, 201);
  }
  static async deleteUsuario(req, res) {
      const { id } = req.params;
      const result = await UsuarioService.eliminar(id);
      if(!result.success) return ResponseProvider.error(res, result.message, result.code);
      return ResponseProvider.success(res, null, result.message);
  }
  static async getAllRoles(req, res) {
    try {
      const roles = await Rol.findAll();
      return ResponseProvider.success(res, roles, "Roles listados.");
    } catch (error) {
      return ResponseProvider.error(res, "Error al obtener roles.", 500);
    }
  }
}
export default UsuarioController;