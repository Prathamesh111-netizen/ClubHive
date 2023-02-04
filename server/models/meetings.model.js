import mongoose from "mongoose";

const Document =  mongoose.Schema({
  meetingId: {type : String, default : "None"},
  userId : {type : String, default : "None"},
  committee : {type : String, default : "None"},
})

export default mongoose.model("Meetings", Document);
