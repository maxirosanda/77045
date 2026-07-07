import { Router } from "express";
import { sessionsController } from "../controllers/sessions.controller.js";
import passport from "passport";

const router = Router()

router.post("/login",passport.authenticate("login",{session:false}), sessionsController.login)
router.post("/register",passport.authenticate("register",{session:false}), sessionsController.register)
router.get("/github",passport.authenticate("github",{session:false}))
router.get("/github-callback",passport.authenticate("github",{session:false}),sessionsController.github)
router.get("/current-user",passport.authenticate("jwt",{session:false}) ,sessionsController.currentUser)
router.get("/logout",sessionsController.logout)

export default router