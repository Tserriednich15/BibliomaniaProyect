import AuthService from "../services/authServices.js";

class AuthController {

  static async register  (req, res) {
    const { usuario, contrasena } = req.body;
    if (!usuario || !contrasena) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const result = await AuthService.register(usuario, contrasena);
    return res.status(result.code).json({ message: result.message });
  };

  static async login  (req, res) {
    const { usuario, contrasena } = req.body;
    if (!usuario || !contrasena) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const result = await AuthService.login(usuario, contrasena);

    if (result.error) {
      return res.status(result.code).json({ message: result.message });
    }

    return res.status(result.code).json({
      message: result.message,
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    });
  };

  static async refreshToken  (req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token de refresco requerido" });
    }

    const result = await AuthService.renewTokens(refreshToken); // función unificada

    if (result.error) {
      return res.status(result.code).json({ message: result.message });
    }

    return res.status(result.code).json({
      message: result.message,
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    });
  };

  static async logout  (req, res) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const result = await AuthService.logout(userId);
    return res.status(result.code).json({ message: result.message });
  };
}
export default AuthController;