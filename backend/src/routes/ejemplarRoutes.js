import express from "express";
import EjemplarController from "../controllers/ejemplarController.js"
import { verifyToken } from "../middlewares/auth/tokenMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, EjemplarController.getAllEjemplares);
router.get("/:id", verifyToken, EjemplarController.getEjemplarById);
router.post("/", verifyToken, EjemplarController.createEjemplar);
router.put("/:id", verifyToken, EjemplarController.updateEjemplar);
router.delete("/:id", verifyToken, EjemplarController.deleteEjemplar);

export default router;