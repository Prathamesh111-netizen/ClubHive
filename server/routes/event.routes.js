import express from "express";
import {
  getAllEvent,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  ApprovalStatus
} from "../controllers/eventControllers.js";

import {
  RequestApproveEvent,
  ApproveEvent,
  disApproveEvent,
} from "../controllers/approvalControllers.js";

const router = express.Router();

router.route("/req_approval/:eventId").post(RequestApproveEvent);

router.route("/approve/:eventId").post(ApproveEvent);

router.route("/reject/:eventId").post(disApproveEvent);

router.route("/comm/:committeeId").get(getEvent);

router.route("/ApprovalStatus/:eventId").get(ApprovalStatus);

router.route("/:eventId").get(getEvent).put(updateEvent).delete(deleteEvent);



router.route("/").get(getAllEvent).post(createEvent);

export default router;
