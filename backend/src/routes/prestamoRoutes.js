import { Router } from "express";
import PrestamoController from "../controllers/prestamoController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = Router();

router.get("/", verifyToken, PrestamoController.obtenerTodos);
router.get("/:id", verifyToken, PrestamoController.obtenerPorId);
router.post("/", verifyToken, PrestamoController.crearPrestamo);
router.put("/:id", verifyToken, PrestamoController.actualizarPrestamo);
router.delete("/:id", verifyToken, PrestamoController.eliminarPrestamo);

export default router;