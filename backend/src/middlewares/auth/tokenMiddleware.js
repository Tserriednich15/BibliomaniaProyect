import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseProvider from "../../providers/responseProvider.js";

dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ResponseProvider.error(
      res,
      "Acceso denegado. Token no proporcionado",
      401
    );
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return ResponseProvider.error(res, "Token inválido", 401);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return ResponseProvider.error(res, "Token inválido o expirado", 401);
  }
}