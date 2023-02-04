import dotenv from "dotenv";
import Event from "../models/event.model.js";
import Approval from "../models/Approval.model.js";
dotenv.config();

const getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      success: true,
      events: events,
    });
  } catch (error) {
    next(error);
  }
};

const getEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
  res.status(200).json({
    success: true,
    event: event,
  });
};

const createEvent = async (req, res, next) => {
  var {
    title,
    description,
    committee,
    img,
    Budget,
    Prize,
    startTime,
    endTime,
    startDate,
    endDate,
    rooms
  } = req.body;
  title = title || "";
  description = description || "";
  committee = committee || "";
  img = img || "";
  startTime = startTime || "";
  endTime = endTime || "";
  startDate = startDate || "";
  endDate = endDate || "";
  Budget = Budget || "";
  Prize = Prize || "";
  rooms = rooms || [];

  const event = await Event.create({
    title,
    description,
    committee,
    img,
    startDate,
    endDate,
    startTime,
    endTime,
    Budget,
    Prize,
    rooms
  });
  res.status(201).json({
    success: true,
    event: event,
  });
};

const updateEvent = async (req, res, next) => {
  const { eventId } = req.params;
  var {
    title,
    description,
    committe,
    img,
    rounds,
    startTine,
    endTime,
    Budget,
    Prize,
  } = req.body;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404).json({
      success: false,
      message: "Event not found",
    });
  } else {
    title = title || event.title;
    description = description || event.description;
    committe = committe || event.committe;
    img = img || event.img;
    rounds = rounds || event.rounds;
    startTine = startTine || event.startTine;
    endTime = endTime || event.endTime;
    Budget = Budget || event.Budget;
    Prize = Prize || event.Prize;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        committe,
        img,
        rounds,
        startTine,
        endTime,
        Budget,
        Prize,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      event: updatedEvent,
    });
  }
};

const deleteEvent = async (req, res, next) => {
  const { eventId } = req.params;
  const ops = await Event.findByIdAndDelete(eventId);
  if (!ops) {
    res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
};

const ApprovalStatus = async (req, res, next) => {
  const { eventId } = req.params;
  console.log(eventId);
  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404).json({
      success: false,
      message: "Event not found",
    });
  } else {
    const users = await Approval.find({ eventId: eventId });
    var eventData = [];
    var flag = true;
    console.log(users);
    for (let user of users) {
      eventData.push({
        userId: user.userId,
        status: user.approvalStatus,
      });
      if (user.approvalStatus == "Rejected") flag = false;
    }
  }

  if (flag) {
    Event.findByIdAndUpdate(eventId, { approvalStatus: true }, { new: true });
  }

  res.status(200).json({
    success: true,
    eventData,
    approvalStatus: flag,
  });
};

export {
  getAllEvent,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  ApprovalStatus,
};
