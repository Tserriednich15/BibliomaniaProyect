import express from "express";
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";
import MultaController from "../controllers/multaController.js"

const router = express.Router();

router.get("/", verifyToken, MultaController.getAllMultas);
router.get("/:id", verifyToken, MultaController.getMultaById);
router.post("/", verifyToken, MultaController.createMulta);
router.put("/:id", verifyToken, MultaController.updateMulta);
router.delete("/:id", verifyToken, MultaController.deleteMulta);

export default router;