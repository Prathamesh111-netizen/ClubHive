import mongoose from "mongoose";

var userModeSchema = mongoose.Schema({
  email: { type: String,  },
  committeName: { type: String, default: "None" },
  role: { type: String, default: "User" },
  status: { type: String,  default: "Active" },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})


export default mongoose.model("CommitteeMember", userModeSchema);