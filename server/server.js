import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";
// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import Razorpayroutes from "./routes/razorpay.routes.js";
import UserRoutes from "./routes/user.routes.js";
import calendarRoutes from "./routes/calendar.routes.js";
import EventRoutes from "./routes/event.routes.js";
import CommitteeRoutes from "./routes/committee.routes.js";
import FacultyRoutes from "./routes/faculty.routes.js";

// import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();
// use morgan in development mode
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// connect to the mongoDB database
connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors()); // to avoid CORS errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

import cloudinary from "./config/cloudinary.js";
app.use("/upload", async (req, res) => {
  try {
 
    const result = cloudinary.uploader.upload(req.files.file.path);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
});

// configure all the routes
app.use("/api/razorpay", Razorpayroutes);
app.use("/api/user", UserRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/event", EventRoutes);
app.use("/api/committee", CommitteeRoutes);
app.use("/api/faculty", FacultyRoutes);


app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/favico.ico", (req, res) => {
  res.sendStatus(404);
});

// middleware to act as fallback for all 404 errors
app.use(notFound);

// configure a custome error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`http://localhost:${process.env.PORT} in ${process.env.ENV} mode`)
);

// web crawlers
