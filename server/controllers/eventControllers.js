import dotenv from "dotenv";
import Event from "../models/event.model.js";
import Approval from "../models/Approval.model.js";
import Room from "../models/room.model.js";
import CalendarEvent from "../models/calendarEvent.model.js";

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

const getEventByCommittee = async (req, res, next) => {
  try {
    const { committee } = req.params;
    const event = await Event.find({committee : committee});
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
      rooms,
      category,
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
    category = category || "";

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
      category,
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
      rooms,
      category
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
      budget = budget || event.budget;
      prize = prize || event.prize;
      rooms = rooms || event.rooms;
      category = category || event.category;

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
          category
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
      // for each room
      // check one by one if the room is available for time slot
      // if available then allocate the room
      // else move to next room
      // const rooms = await Room.find({});
      // const roomByType = {
      //   hall: [],
      //   lab: [],
      //   classRoom: [],
      // }
      // const newRoom = [];
      // const calendarEvents = CalendarEvent.find({});
      // for(let event in calendarEvents) {
        
      // }
      // for(let room in rooms) {
      //   roomByType[room.type].push(room);
      // }
      
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
  getEventByCommittee
};
