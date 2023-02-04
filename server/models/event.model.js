import mongoose from "mongoose";

var Document = mongoose.Schema({
  title: { type: String,  },
  description : {type : String},
  committee: { type: String, default: "None" },
  img: { type: String,  },
  startDate : {type : String},
  endDate : {type : String},
  startTime : {type : String},
  endTime : {type : String},
  budget : {type : Object},
  prize : {type : String},
  rooms : {type : Object},
  approvalStatus : {type : String, default : "Pending"},
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})


export default mongoose.model("Event", Document);