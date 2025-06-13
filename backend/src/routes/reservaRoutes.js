import { Router } from "express";
import ReservaController from "../controllers/reservaController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = Router();

router.get("/", verifyToken, ReservaController.obtenerTodos);
router.get("/:id", verifyToken, ReservaController.obtenerPorId);
router.post("/", verifyToken, ReservaController.crear);
router.put("/:id", verifyToken, ReservaController.actualizar);
router.delete("/:id", verifyToken, ReservaController.eliminar);

export default router;