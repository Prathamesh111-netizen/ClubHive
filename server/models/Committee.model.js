import mongoose from "mongoose";

var Document = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  presidentEmail : { type: String },
  profilePic: { type: String },
  type : { type: String, default: "committee"},
  status : { type: String, default: "active"},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("Committee", Document);
