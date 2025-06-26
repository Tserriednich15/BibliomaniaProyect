// src/routes/categoriasRoutes.js

import express from "express";
import CategoriasController from "../controllers/categoriaController.js";
import { verifyToken } from "../middlewares/auth/index.js";

const router = express.Router();

// --- RUTAS DE CATEGORÍAS ---

// GET /api/categorias -> Obtener todas las categorías
router.get("/", verifyToken, CategoriasController.getAllCategorias);

// GET /api/categorias/:id -> Obtener una categoría por su ID
router.get("/:id", verifyToken, CategoriasController.getCategoriaById);

// POST /api/categorias -> Crear una nueva categoría
router.post("/", verifyToken, CategoriasController.createCategoria);

// PUT /api/categorias/:id -> Actualizar una categoría
router.put("/:id", verifyToken, CategoriasController.updateCategoria);

// DELETE /api/categorias/:id -> Eliminar una categoría
router.delete("/:id", verifyToken, CategoriasController.deleteCategoria);

export default router;