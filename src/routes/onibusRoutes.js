import { Router } from "express";
import { puxarOnibus, cadastrarOnibus, buscarOnibus, getAllBusData } from "../controllers/onibusController.js";

const router = Router();

router.get("/", puxarOnibus);
router.get("/getAll", getAllBusData)
router.post("/criar", cadastrarOnibus);
router.get("/:id", buscarOnibus);

export default router;