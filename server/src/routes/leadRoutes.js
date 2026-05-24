import { Router } from "express"
import {createLead, updateLead,getLeads,getStats} from "../controllers/leadController.js"
import auth from "../middleware/authMiddleware.js"

const router = Router()

router.post("/", auth, createLead)
router.get("/", auth, getLeads)
router.get("/stats",auth,getStats)
router.put("/:id", auth, updateLead);

export default router