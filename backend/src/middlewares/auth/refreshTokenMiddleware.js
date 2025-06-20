// middlewares/auth/refreshTokenMiddleware.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ResponseProvider from "../../providers/responseProvider.js";

dotenv.config();

export function verifyRefreshToken(req, res, next) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return ResponseProvider.error(res, "Refresh token no proporcionado", 401);
  }

  try {
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en verifyRefreshToken:", error.message);
    return ResponseProvider.error(res, "Refresh token inválido o expirado", 403);
  }
}