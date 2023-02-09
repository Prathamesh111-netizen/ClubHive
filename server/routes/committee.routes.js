import express from "express";
import {
  getAllCommittee,
  getCommitteeById,
  createCommittee,
  updateCommittee,
  deleteCommittee,
} from "../controllers/committee.controller.js";

const router = express.Router();

router.route("/").get(getAllCommittee).post(createCommittee);

router
  .route("/:committeeId")
  .get(getCommitteeById)
  .put(updateCommittee)
  .delete(deleteCommittee);

export default router;
