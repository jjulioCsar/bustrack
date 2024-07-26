import { Router } from "express";
import { puxarOnibus, cadastrarOnibus, buscarOnibus } from "../controllers/onibusController.js";

const router = Router();

router.get("/", puxarOnibus);
router.post("/criar", cadastrarOnibus);
router.get("/:id", buscarOnibus);

export default router;