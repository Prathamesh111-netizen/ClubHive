import mongoose from "mongoose";

var Document = mongoose.Schema({
  name: { type: String,  },
  department: { type: String, default: "SPIT" },
  profilePic: { type: String,  },
  email: { type: String,  },
  password: {type: String, default: "default"},
  type: { type: String, default: "User" },
  status: { type: Boolean,  default: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})


export default mongoose.model("Faculty", Document);