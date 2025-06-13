import { Router } from "express";
import DevolucionController from "../controllers/devolucionController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = Router();

router.get("/", verifyToken, DevolucionController.obtenerTodos);
router.get("/:id", verifyToken, DevolucionController.obtenerPorId);
router.post("/", verifyToken, DevolucionController.crear);
router.put("/:id", verifyToken, DevolucionController.actualizar);
router.delete("/:id", verifyToken, DevolucionController.eliminar);

export default router;