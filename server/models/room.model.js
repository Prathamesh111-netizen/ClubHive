import mongoose from "mongoose";

var roomSchema = mongoose.Schema({
  roomNo: { type: String },
  type: { type: String },
  capacity: { type: String },
  //   available: { type: Boolean },
});

export default mongoose.model("Room", roomSchema);
