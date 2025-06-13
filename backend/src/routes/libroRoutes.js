// routes/libroRoutes.js
import express from "express";
import libroController from "../controllers/libroController.js";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", libroController.listarLibros);
router.get("/:id", libroController.obtenerLibroPorId);

router.post("/", verifyToken, libroController.crearLibro);
router.put("/:id", verifyToken, libroController.actualizarLibro);
router.delete("/:id", verifyToken, libroController.eliminarLibro);

export default router;