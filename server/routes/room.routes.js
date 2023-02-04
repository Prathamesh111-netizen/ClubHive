import express from "express";
import {
  getRooms,
  addRoom,
  updateEvents,
} from "../controllers/calendarEventControllers.js";
const router = express.Router();

router.route("/get-events").get(getEvents);
router.route("/update-events").put(updateEvents);

export default router;
