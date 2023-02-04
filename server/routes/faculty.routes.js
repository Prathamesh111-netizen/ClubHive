import express from "express";

import { registerFaculty, getFaculty, deleteFaculty } from "../controllers/faculty.controller.js";

const router = express.Router();

router.route("/").post(registerFaculty).get(getFaculty);

router.route("/:facultyId").delete(deleteFaculty);

// router.route("/all_approve_req/:facultyId").get(AllApproveReq);

export default router;