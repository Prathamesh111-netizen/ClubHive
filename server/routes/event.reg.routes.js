import express from "express";
import {
  registerForEvent,
  allRegisteredEvents,
} from "../controllers/event.reg.controllers.js";

const router = express.Router();

router.route("/:userId").get(allRegisteredEvents);

router.route("/").post(registerForEvent);


export default router;
