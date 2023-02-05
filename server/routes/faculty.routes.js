import express from "express";

import {
  registerFaculty,
  getFaculty,
  deleteFaculty,
  getFacultyById,
  AllApproveReq,
} from "../controllers/faculty.controller.js";

const router = express.Router();

router.route("/:facultyId").delete(deleteFaculty).get(getFacultyById);
router.route("/all_approve_req/:facultyId").get(AllApproveReq);
router.route("/").post(registerFaculty).get(getFaculty);

export default router;
