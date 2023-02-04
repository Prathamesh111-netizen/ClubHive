import mongoose from "mongoose";

var Document = mongoose.Schema({
  userId: { type: String },
  eventId: { type: String },
  approvalStatus : { type: String, default: "pending" },
});

export default mongoose.model("Approval", Document);
