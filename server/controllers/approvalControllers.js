import axios from "axios";
import dotenv from "dotenv";
import Approval from "../models/Approval.model.js";
import CommitteeModel from "../models/Committee.model.js";
import Event from "../models/event.model.js";
import sendEmail from "../utils/mail.js";
dotenv.config();

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

export { RequestApproveEvent, ApproveEvent, disApproveEvent };
