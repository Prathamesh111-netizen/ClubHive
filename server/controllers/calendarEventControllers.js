dotenv.config();
import dotenv from "dotenv";
import CalendarEvent from "../models/calendarEvent.model.js";
import Room from "../models/room.model.js";

const getEvents = async (req, res, next) => {
  const { committeeName } = req.query;
  let events = [];
  try {
    if (!committeeName || committeeName === "global") {
      let roomNames = await Room.find({}, { roomNo: 1, _id: 0 });
      roomNames = roomNames.map((room) => room.roomNo);
      let calendarEvents = await CalendarEvent.find({});
      let globalEvents = [];
      globalEvents = calendarEvents.filter((event) => {
        if (!roomNames.includes(event.committeeName)) {
          return event;
        }
      });
      events = globalEvents;
    } else {
      events = await CalendarEvent.find({ committeeName: committeeName });
    }
    return res
      .status(200)
      .json({ message: "Events fetched successfully", events: events });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const updateEvents = async (req, res, next) => {
  var ops = [];
  let { events, committeeName } = req.body.data;

  try {
    events.forEach((event) => {
      console.log("event before");
      console.log(event);
      let date = event._days[0];
      let tSplit = date.split("T");
      let dashSplit = tSplit[0].split("-");
      dashSplit[2] = String(parseInt(dashSplit[2]) + 1);
      let newDate = dashSplit.join("-");
      newDate = newDate + "T" + tSplit[1];
      // console.log(typeof event._days[0]);
      // console.log(event);
      event.committeeName = committeeName;
      event._days = [newDate];
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
