import AuthService from "../services/authServices.js";
import ResponseProvider from "../providers/responseProvider.js"; // ¡Importante!

class AuthController {
  static async register(req, res) {
    const result = await AuthService.register(req.body);

    if (result.error) {
      return ResponseProvider.error(res, result.message, result.code);
    }
    return ResponseProvider.success(res, { userId: result.userId }, result.message, 201);
  }

  static async login(req, res) {
    try {
      const { usuario, contrasena } = req.body;
      if (!usuario || !contrasena) {
        // Usamos el ResponseProvider para errores de validación
        return ResponseProvider.error(res, "Usuario y contraseña son obligatorios", 400);
      }

      const result = await AuthService.login(usuario, contrasena);

      if (result.error) {
        // Si el servicio devuelve un error (ej. credenciales incorrectas), usamos el ResponseProvider
        return ResponseProvider.error(res, result.message, result.code);
      }
      
      // Si el servicio tiene éxito, pasamos el resultado al ResponseProvider.
      // result.data ya contiene los tokens, así que la respuesta será { success: true, data: { accessToken: '...', refreshToken: '...' } }
      return ResponseProvider.success(res, result.data, result.message);

    } catch (error) {
      // Catch de seguridad para cualquier error no controlado
      console.error("Error inesperado en AuthController.login:", error);
      return ResponseProvider.error(res, "Ocurrió un error inesperado.", 500);
    }
  }

  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return ResponseProvider.error(res, "Token de refresco requerido", 400);
    }

    const result = await AuthService.renewTokens(refreshToken);

    if (result.error) {
      return ResponseProvider.error(res, result.message, result.code);
    }
    return ResponseProvider.success(res, result.data, result.message);
  }

  static async logout(req, res) {
    const userId = req.user?.id;
    if (!userId) {
      return ResponseProvider.error(res, "Usuario no autenticado", 401);
    }

    const result = await AuthService.logout(userId);
    return ResponseProvider.success(res, null, result.message);
  }
}

export default AuthController;
