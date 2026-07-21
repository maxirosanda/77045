import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js";
import passport from "passport";
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.post("/login",passportCall("login"), sessionsController.login)
router.post("/register",passportCall("register"), sessionsController.register)
router.get("/github",passport.authenticate("github",{session:false}))
router.get("/github-callback",passport.authenticate("github",{session:false}),sessionsController.github)
router.get("/current-user",passportCall("jwt"),sessionsController.currentUser)
router.get("/logout",sessionsController.logout)

export default router