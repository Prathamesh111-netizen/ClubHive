import express from "express";

import { registerUser, login, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/:userId").get(getUser)

export default router;