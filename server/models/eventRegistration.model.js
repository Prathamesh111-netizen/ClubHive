import mongoose from "mongoose";

var Event = mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, default : "Registered" },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

export default mongoose.model("EventRegistration", Event);
