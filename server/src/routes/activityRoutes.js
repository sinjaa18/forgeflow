import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import { getActivities } from "../controllers/activityController.js";

const router = Router();
router.get("/", auth, getActivities);
export default router;
