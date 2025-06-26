import { Router } from "express";
import DevolucionController from "../controllers/devolucionController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
const router = Router();
router.get("/", verifyToken, DevolucionController.obtenerTodos);
router.get("/:id", verifyToken, DevolucionController.obtenerPorId);
export default router;