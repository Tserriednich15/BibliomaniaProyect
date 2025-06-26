import express from "express";
import PrestamoController from "../controllers/prestamoController.js";
import { verifyToken } from "../middlewares/auth/index.js";
const router = express.Router();
router.get("/", verifyToken, PrestamoController.getPrestamosActivos);
router.post("/", verifyToken, PrestamoController.createPrestamo);
router.post("/:id/devolver", verifyToken, PrestamoController.procesarDevolucion);
export default router;