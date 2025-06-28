import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseProvider from "../../providers/responseProvider.js";

dotenv.config();

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return ResponseProvider.error(
        res,
        "Acceso denegado. Token no proporcionado o mal formado",
        401
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en verifyToken:", error.message);
    return ResponseProvider.error(res, "Token inválido o expirado", 401);
  }
}
