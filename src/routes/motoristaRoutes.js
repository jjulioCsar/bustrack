import { Router } from "express";
import { puxarMotoristas, cadastrarMotorista, buscarMotorista,  deletarMotorista } from "../controllers/motoristaController.js";

const router = Router();

router.get("/", puxarMotoristas);
router.post("/criar", cadastrarMotorista);
router.get("/:id", buscarMotorista);
router.delete("/remover/:id", deletarMotorista);

export default router;