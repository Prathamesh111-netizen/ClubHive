import express from "express";
import {
  razorpayVerify,
  razorpayOrder,
} from "../controllers/razorpayControllers.js";

const router = express.Router();

router.route("/order").post(razorpayOrder);

router.route("/verification").post(razorpayVerify);

export default router;
