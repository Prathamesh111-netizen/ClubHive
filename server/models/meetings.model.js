import mongoose from "mongoose";

const Document =  mongoose.Schema({
  _id: String,
  MeetingId: {type : String , default : "None"},
  UserId : {type : String, default : "None"},
  committee : {type : String, default : "None"},
})

export default mongoose.model("Meetings", Document);
