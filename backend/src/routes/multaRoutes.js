import express from "express";
import { verifyToken } from "../middlewares/auth/index.js";
import MultaController from "../controllers/multaController.js";
const router = express.Router();
router.get("/", verifyToken, MultaController.getAllMultas);
router.put("/:id/pagar", verifyToken, MultaController.pagarMulta);
export default router;
