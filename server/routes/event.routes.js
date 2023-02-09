import express from "express";
import {
  getAllEvent,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  ApprovalStatus,
  getEventByCommittee,
  getPendingEventByCommittee,
  getEventByCategory,
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

router.route("/comm").get(getEventByCommittee);
router.route("/comm/pending").get(getPendingEventByCommittee);

router.route("/ApprovalStatus/:eventId").get(ApprovalStatus);

router.route("/category/:category").get(getEventByCategory);

router.route("/:eventId").get(getEvent).put(updateEvent).delete(deleteEvent);

router.route("/").get(getAllEvent).post(createEvent);

export default router;
