import express from "express";
import connection from "../utils/db.js";
import { camposLogin, camposRegistro, verifyToken } from "../middlewares/auth/index.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM categorias");
    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Crear una nueva categoría
router.post("/", verifyToken, async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }

  try {
    await connection.query("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion]);
    res.json({ message: "Categoría creada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" });
  }
});

// Actualizar categoría
router.put("/:id", verifyToken, async (req, res) => {
  const { nombre, descripcion } = req.body;
  const { id } = req.params;

  try {
    await connection.query("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id]);
    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

// Eliminar categoría
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await connection.query("DELETE FROM categorias WHERE id = ?", [id]);
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

export default router;
