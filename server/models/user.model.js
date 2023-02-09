import mongoose from "mongoose";

var userModeSchema = mongoose.Schema({
  name: { type: String, default: "None"  },
  department: { type: String, default: "None" },
  profilePic: { type: String, default: "None" },
  email: { type: String,  },
  password: {type: String, default : "123" },
  type: { type: String, default: "User" },
  status: { type: String,  default: "Active" },
  committee : { type: String,  default: "None" },
  deviceToken : { type: String,  default: ""},
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})


export default mongoose.model("User", userModeSchema);