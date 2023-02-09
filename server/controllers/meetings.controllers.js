import dotenv from "dotenv";
import Meetings from "../models/meetings.model.js";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const CreateMeeting = async (req, res, next) => {
  try {
    const meetingId = uuidv4();
    const { userId, committee } = req.body;
    const meeting = await Meetings.create({
      meetingId,
      userId,
      committee,
    });
    res.status(201).json({
      success: true,
      meeting: meeting,
    });
  } catch (error) {
    next(error);
  }
};

const getMeetingById = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meetings.findById(meetingId);
    if (meeting) {
      res.status(200).json({
        success: true,
        meeting: meeting,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getMeetings = async (req, res, next) => {
  try {
    const meetings = await Meetings.find({});
    res.status(200).json({
      success: true,
      meetings: meetings,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMeeting = async (req, res, next) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meetings.findByIdAndDelete(meetingId);
    if (meeting) {
      res.status(200).json({
        success: true,
        message: "Meeting deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export { CreateMeeting, getMeetingById, getMeetings, deleteMeeting };
