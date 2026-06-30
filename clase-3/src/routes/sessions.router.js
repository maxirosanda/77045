import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/login",sessionsController.login)
router.post("/register",sessionsController.register)
router.get("/current-user",authMiddleware ,sessionsController.currentUser)
router.get("/logout",sessionsController.logout)

export default router