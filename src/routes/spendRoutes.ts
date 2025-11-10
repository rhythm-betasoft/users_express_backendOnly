import { Router } from "express";
import { getAllSpends, createSpend } from "../controllers/spendController";

const router = Router();

router.get("/spends", getAllSpends);
router.post("/spends", createSpend);

export default router;
