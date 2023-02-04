import express from "express";

import { createMember, getAllMembers, updateMember, deleteMember, getMemberById } from "../controllers/members.controller.js";

const router = express.Router();

router.route("/").get(getAllMembers).post(createMember);

router.route("/:memberId").get(getMemberById).put(updateMember).delete(deleteMember);

export default router;
