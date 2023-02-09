import mongoose from "mongoose";

const Document =  mongoose.Schema({
  meetingId: {type : String, default : "None"},
  userId : {type : String, default : "None"},
  committee : {type : String, default : "None"},
  createdAt : {type : Date, default : Date.now},
  updatedAt : {type : Date, default : Date.now},
})

export default mongoose.model("Meetings", Document);
