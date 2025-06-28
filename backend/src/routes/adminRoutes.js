import express from "express";
const router = express.Router();
router.get("/", (req, res) => {res.json({ message: "Bienvenido a la zona protegida", user: req.usuario });});
export default router;