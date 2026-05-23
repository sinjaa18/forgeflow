import { Router } from "express"
import {createLead, getLeads} from "../controllers/leadController.js"
import auth from "../middleware/authMiddleware.js"

const router = Router()

router.post("/", auth, createLead)
router.get("/", auth, getLeads)

export default router