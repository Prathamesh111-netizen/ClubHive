import express from "express";

import {
  registerUser,
  login,
  getUser,
  setFCMToken,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/:userId").get(getUser);
router.route("/set-device-token").put(setFCMToken);

export default router;
