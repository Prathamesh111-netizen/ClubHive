import express from "express";

import { createMember, getAllMembers, updateMember, deleteMember } from "../controllers/members.controller.js";

const router = express.Router();

router.route("/").get(getAllMembers).post(registerUser);

router.route("/:userId").get(getUser).put(updateMember).delete(deleteMember);

export default router;
