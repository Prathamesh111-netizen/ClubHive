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
  try {
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
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    var {
      title,
      description,
      committee,
      img,
      startTime,
      endTime,
      startDate,
      endDate,
      rooms,
      budget,
      prize,
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
    budget = budget || "";
    prize = prize || "";
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
      budget,
      prize,
      rooms,
    });
    res.status(201).json({
      success: true,
      event: event,
    });
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    var {
      title,
      description,
      committe,
      img,
      rounds,
      startTine,
      endTime,
      budget,
      prize,
      rooms
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
      budget = Budget || event.Budget;
      prize = Prize || event.Prize;
      rooms = rooms || event.rooms;

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
          budget,
          prize,
          rooms,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        event: updatedEvent,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const ApprovalStatus = async (req, res, next) => {
  try {
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
      // allocate rooms to the event
      const rooms = [];
      // for each room
      // check one by one if the room is available for time slot
      // if available then allocate the room
      // else move to next room
    }

    res.status(200).json({
      success: true,
      eventData,
      approvalStatus: flag,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllEvent,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  ApprovalStatus,
};
