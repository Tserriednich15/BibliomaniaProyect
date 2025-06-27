import ResponseProvider from "../../providers/responseProvider.js";

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
