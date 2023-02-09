import express from "express";
import { createRoom, getRooms } from "../controllers/roomControllers.js";
const router = express.Router();

router.route("/create-room").post(createRoom);
router.route("/get-rooms").get(getRooms);

export default router;
