import express from "express";
import {
  getEvents,
  updateEvents,
} from "../controllers/calendarEventControllers.js";
const router = express.Router();

router.route("/get-events").get(getEvents);
router.route("/update-events").put(updateEvents);

export default router;
