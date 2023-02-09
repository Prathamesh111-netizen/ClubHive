import mongoose from "mongoose";

var Event = mongoose.Schema({
  title: { type: String,  },
  description : {type : String},
  committee: { type: String, default: "None" },
  category: { type: String, default: "None" },
  img: { type: String,  },
  startDate : {type : String},
  endDate : {type : String},
  startTime : {type : String},
  endTime : {type : String},
  budget : {type : Object},
  prize : {type : String},
  rooms : {type : Object},
  roomsAllocated : {type : Object, default : {}},
  approvalStatus : {type : String, default : "Pending"},
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
})

export default mongoose.models.Event || mongoose.model('Event', Event);
// export default mongoose.model("Event", Event);
