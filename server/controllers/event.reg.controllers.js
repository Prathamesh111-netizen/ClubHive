import dotenv from "dotenv";
import EventRegistration from "../models/eventRegistration.model.js";

dotenv.config();

const registerForEvent = async (req, res, next) => {
  try {
    const { userId  } = req.params;
    const { eventId } = req.body;
    if (eventId && userId) {
      const registration = await CalendarEvent.create({ eventId, userId });
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
    res.status(200).json({
      success: true,
      registrations: registrations,
    });
  } catch (error) {
    next(error);
  }
};

export { registerForEvent, allRegisteredEvents };
