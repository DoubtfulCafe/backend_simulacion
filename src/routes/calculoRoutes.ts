import { Router } from "express";
import { calcularIMCyTMB } from "../controllers/calculoController";

const router = Router();

// Ruta para el cálculo del IMC y TMB
router.post("/calcular", calcularIMCyTMB);

export default router;
