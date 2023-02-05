import axios from "axios";
import dotenv from "dotenv";
import Approval from "../models/Approval.model.js";
import CommitteeModel from "../models/Committee.model.js";
import Event from "../models/event.model.js";
import calendarEvent from "../models/calendarEvent.model.js"
import sendEmail from "../utils/mail.js";
import Room from "../models/room.model.js";
dotenv.config();



const Rooms = async (req, res, next) => {
  var startDate = new Date(req.body.startDate).getTime();
  var endDate = new Date(req.body.endDate).getTime();
  const calendarEvents = await calendarEvent.find({});
  const roomStartTime = new Date(startDate).getTime();
  const roomEndtime = new Date(endDate).getTime();
  const canBeAssigned = new Array();
  var result = {lab: 0, hall: 0, classroom: 0, auditorium: 0}
  var temp = { lab: new Set(), hall: new Set(), classroom: new Set(), auditorium: new Set() }
  for(let event in calendarEvents) {
    var curStartTime = new Date(calendarEvents[event].start).getTime();
    var curEndTime = new Date(calendarEvents[event].end).getTime();
    if(curEndTime < roomStartTime || roomEndtime < curStartTime) {
      continue;
    }
    canBeAssigned.push(calendarEvents[event]);
    var newRoom = await Room.findOne({committeeName: calendarEvents[event].committeeName});
    temp[newRoom.type].add(calendarEvents[event].committeeName);
  }
  const sss = await Room.find({});
  sss.map((room) => {
    result[room.type]++;
  })
  res.send({
    rooms: {lab: temp.lab.size, hall: temp.hall.size, classroom: temp.classroom.size, auditorium: temp.auditorium.size},
    result: result
  })
}

const RequestApproveEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { users } = req.body;
    users.map((userId) => Approval.create({ eventId, userId }));

    res.status(201).json({
      success: true,
      message: "Approval Request sent to all users",
    });
  } catch (error) {
    next(error);
  }
};

const ApproveEvent = async (req, res, next) => {
  try {
    console.log(req);
    const { eventId } = req.params;
    const { userId, committee, deviceToken } = req.body;
    const approval = await Approval.find({ eventId: eventId, userId: userId });
    if (!approval) {
      return res.status(400).json({
        success: false,
        message: "Approval not found",
      });
    }

    const UpdatedApproval = await Approval.findByIdAndUpdate(
      approval._id,
      { approvalStatus: "Approved" },
      { new: true }
    );

    const event = await Event.findByIdAndUpdate(
      eventId,
      { approvalStatus: "Approved" },
      { new: true }
    );

    const presidentEmail = CommitteeModel.findOne(
      { name: committee },
      { email: 1, _id: 0 }
    );
    //write email approved,
    sendEmail(presidentEmail);

    await axios.post("https://fcm.googleapis.com/fcm/send", {
      to: deviceToken,
      notification: {
        body: "Approval or Event",
        title: "Your evevnt has been aprroved by dean of your college",
      },
    });

    res.status(201).json({
      success: true,
      approval: event,
      rooms: roomm
    });
  } catch (error) {
    next(error);
  }
};

const disApproveEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;
    const approval = await Approval.findOne({ eventId, userId });
    const UpdatedApproval = await Approval.findByIdAndUpdate(
      approval._id,
      { approvalStatus: "Rejected" },
      { new: true }
    );
    res.status(201).json({
      success: true,
      approval: UpdatedApproval,
    });
  } catch (error) {
    next(error);
  }
};

export { RequestApproveEvent, ApproveEvent, disApproveEvent, Rooms };
