import express from "express";

import {
  registerFaculty,
  getFaculty,
  deleteFaculty,
  getFacultyById,
  AllApproveReq,
} from "../controllers/faculty.controller.js";

const router = express.Router();

router.route("/register").post(registerFaculty);
router.route("/").get(getFaculty);
router.route("/:facultyId").delete(deleteFaculty).get(getFacultyById);

router.route("/all_approve_req/:facultyId").get(AllApproveReq);

export default router;
