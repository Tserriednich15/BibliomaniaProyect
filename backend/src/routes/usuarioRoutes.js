// routes/usuarioRoutes.js
import express from "express";
import { obtenerUsuarios } from "../controllers/usuarioController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import { checkRole } from "../middlewares/auth/checkRole.js";

const router = express.Router();

router.get("/", verifyToken, checkRole(['administrador']), obtenerUsuarios);

export default router;