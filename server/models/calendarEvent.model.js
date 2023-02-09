import mongoose from "mongoose";

var calendarEventSchema = mongoose.Schema({
  committeeName: { type: String },
  id: { type: String },
  start: { type: String },
  end: { type: String },
  title: { type: String },
  description: { type: String },
  allDay: { type: Boolean },
  free: { type: Boolean },
  color: { type: String },
  _days: { type: Array },
});

export default mongoose.model("CalendarEvent", calendarEventSchema);
