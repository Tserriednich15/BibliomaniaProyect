import { Router } from "express";
import VisitanteController from "../controllers/visitanteController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = Router();

router.get("/", verifyToken, VisitanteController.obtenerTodos);
router.get("/:id", verifyToken, VisitanteController.obtenerPorId);
router.post("/", verifyToken, VisitanteController.crear);
router.put("/:id", verifyToken, VisitanteController.actualizar);
router.delete("/:id", verifyToken, VisitanteController.eliminar);

export default router;
