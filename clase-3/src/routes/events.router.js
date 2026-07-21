import { Router } from "express";
import { passportCall } from "../utils/passportCall.js";
import { autorizeRoles } from "../middlewares/authorizeRoles.middlewares.js";
import { eventsController } from "../controllers/events.controller.js";

const router = Router()


router.get("/",passportCall("jwt"),autorizeRoles("user","organizer"),eventsController.getEvents)
router.get("/:id",passportCall("jwt"),autorizeRoles("user","organizer"),eventsController.getEvent)
router.post("/",passportCall("jwt"),autorizeRoles("organizer"),eventsController.createEvent)
router.patch("/:id",passportCall("jwt"),autorizeRoles("organizer"),eventsController.updateEvent)
router.delete("/:id",passportCall("jwt"),autorizeRoles("organizer"),eventsController.deleteEvent)
router.post("/modify-status/:id",passportCall("jwt"),autorizeRoles("organizer"),eventsController.modifyStatus)
router.post("/create-category",eventsController.createCategory)

export default router