import { Router } from "express";
import { puxarLinhas, cadastrarLinha, buscarLinha, editarLinha} from "../controllers/linhaController.js";

const router = Router();

router.get("/", puxarLinhas);
router.post("/criar", cadastrarLinha);
router.get("/:id", buscarLinha);
router.put("/editar/:id", editarLinha);


export default router;