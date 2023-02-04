import express from "express";

import { CreateMeeting , getMeetingById, getMeetings, deleteMeeting} from "../controllers/meetings.controllers.js";

const router = express.Router();

router.route("/").post(CreateMeeting).get(getMeetings);

router.route("/:meetingId").get(getMeetingById).delete(deleteMeeting);


export default router;