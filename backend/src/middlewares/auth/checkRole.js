// middlewares/auth/checkRole.js
import ResponseProvider from "../../providers/responseProvider.js";

/**
 * Middleware para verificar si el usuario tiene el rol requerido.
 * @param {Array} requiredRoles - Arreglo de roles permitidos (por nombre: 'administrador', 'usuario', etc.)
 */
export function checkRole(requiredRoles = []) {
  return (req, res, next) => {
    const userRole = req.user?.rol;

    if (!userRole) {
      return ResponseProvider.error(res, "No se pudo verificar el rol del usuario", 403);
    }

    if (!requiredRoles.includes(userRole)) {
      return ResponseProvider.error(res, "Acceso denegado. No tienes permisos suficientes.", 403);
    }

    next();
  };
}
