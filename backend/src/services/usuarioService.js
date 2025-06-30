import Usuario from "../models/usuario.js";
class UsuarioService {
  static async obtenerTodos() {
    try {
      const usuarios = await Usuario.findAll();
      return { success: true, data: usuarios };
    } catch (error) {
      return { success: false, message: "Error al obtener usuarios.", code: 500 };
    }
  }
  static async crear(data) {
    try {
      const existingUser = await Usuario.findByUsername(data.usuario);
      if (existingUser) {
        return { success: false, message: "El nombre de usuario ya existe.", code: 409 }; // 409 Conflict
      }
      const nuevoUsuario = await Usuario.create(data);
      return { success: true, data: nuevoUsuario, message: "Usuario creado exitosamente." };
    } catch (error) {
      return { success: false, message: "Error al crear el usuario.", code: 500 };
    }
  }
  static async eliminar(id) {
    const numericId = Number(id);
    const [usuarioExistente, prestamoCount] = await Promise.all([
      Usuario.findByUsername(numericId),
      Usuario.countPrestamos(numericId)
    ]);
    if (prestamoCount > 0) {
      return {
        success: false,
        code: 409,
        message: `No se puede eliminar el usuario porque está asociado a ${prestamoCount} préstamo(s).`
      };
    }

    try {
      const affectedRows = await Usuario.delete(numericId);
      if (affectedRows === 0) {
        return { success: false, message: "Usuario no encontrado.", code: 404 };
      }
      return { success: true, message: "Usuario eliminado exitosamente." };
    } catch (error) {
      return { success: false, message: error.message, code: 403 };
    }
  }
}
export default UsuarioService;