import dotenv from "dotenv";
import EventRegistration from "../models/eventRegistration.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

dotenv.config();

const registerForEvent = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { eventId } = req.body;
    if (eventId && userId) {
      const registration = await EventRegistration.create({ eventId, userId });
      res.status(201).json({
        message: "Event registered successfully",
        registration: registration,
      });
    } else {
      res.status(400).json({ message: "Please fill all details" });
    }
  } catch (error) {
    next(error);
  }
};

const allRegisteredEvents = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const registrations = await EventRegistration.find({ userId: userId });
    var events = [];
    for (var reg of registrations) {
      const event = await Event.findById(reg.eventId);
      events.push(event);
    }

    res.status(200).json({
      success: true,
      registrations: registrations,
    });
  } catch (error) {
    next(error);
  }
};

const getAllregisteredUsers = async (req, res, next) => {
  try {
    const { committee } = req.params;
    const events = await Event.find({ committee: committee });
    var allregistrations = [];
    for (var event of events) {
      const registrations = await EventRegistration.find({
        eventId: event._id,
      });
      if (registrations.length > 0) {
        for (var reg of registrations) {
          if(reg)
          allregistrations.push(reg.userId);
        }
      }
    }
    console.log(allregistrations);
    
    var registeredusers = [];
    for (var reg of allregistrations) {
      const user = await User.findById(reg);
      if (user)
      registeredusers.push(user);
    }
    res.status(200).json({
      success: true,
      registrations: registeredusers,
    });
  } catch (error) {
    next(error);
  }
};

export { registerForEvent, allRegisteredEvents, getAllregisteredUsers };
