import express from "express";
import {
  registerForEvent,
  allRegisteredEvents,
  getAllregisteredUsers
} from "../controllers/event.reg.controllers.js";

const router = express.Router();

router.route("/registered/:committee").get(getAllregisteredUsers);

router.route("/:userId").get(allRegisteredEvents).post(registerForEvent);



export default router;
