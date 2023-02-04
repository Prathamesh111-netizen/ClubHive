dotenv.config();
import dotenv from "dotenv";
import CalendarEvent from "../models/calendarEvent.model.js";

const getEvents = async (req, res, next) => {
  const { committeeName } = req.query;
  try {
    if (!committeeName || committeeName === "global") {
      events = await CalendarEvent.find();
    } else {
      events = await CalendarEvent.find({ committeeName: committeeName });
    }
    return res
      .status(200)
      .json({ message: "Events fetched successfully", events: events });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const updateEvents = async (req, res, next) => {
  var ops = [];
  let { events, committeeName } = req.body.data;

  try {
    events.forEach((event) => {
      event.committeeName = committeeName;
      event._days = event._days[0];
    });
    await CalendarEvent.deleteMany({ committeeName: committeeName });
    await CalendarEvent.insertMany(events);
    return res.status(200).json({ message: "Events updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: error.message });
  }
};

export { getEvents, updateEvents };
