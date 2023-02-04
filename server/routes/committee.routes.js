import express from "express";


const router = express.Router();



router.route("/").get(getAllEvent).post(createEvent);

export default router;
