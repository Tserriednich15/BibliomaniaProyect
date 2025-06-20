import express from "express";
import AuthController from "../controllers/authController.js";
import { camposRegistro, verifyToken } from "../middlewares/auth/index.js";
import { verifyRefreshToken } from "../middlewares/auth/refreshTokenMiddleware.js";

const router = express.Router();

router.post("/register", camposRegistro, AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh",verifyRefreshToken, AuthController.refreshToken);
router.post("/logout", verifyToken, AuthController.logout);

router.get("/test", (req, res) => {
  res.json({ message: "La ruta de test funciona" });
});

export default router;