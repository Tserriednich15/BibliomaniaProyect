import express from "express";
import { verifyToken } from "../middlewares/auth/index.js";
import UsuarioController from "../controllers/usuarioController.js";
const router = express.Router();
router.get("/", verifyToken, UsuarioController.getAllRoles);
export default router;