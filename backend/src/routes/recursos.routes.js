import { Router } from "express";
import { list, detail, create, update, remove } from "../controllers/recursos.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", list);
router.get("/:id", detail);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
