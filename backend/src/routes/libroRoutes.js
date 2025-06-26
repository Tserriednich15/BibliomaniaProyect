import express from "express";
import LibroController from "../controllers/libroController.js";
import { verifyToken } from "../middlewares/auth/index.js";

const router = express.Router();

router.get("/", verifyToken, LibroController.listarLibros);
router.get("/:id", verifyToken, LibroController.obtenerLibroPorId);
router.post("/", verifyToken, LibroController.crearLibro);
router.put("/:id", verifyToken, LibroController.actualizarLibro);
router.delete("/:id", verifyToken, LibroController.eliminarLibro);

export default router;