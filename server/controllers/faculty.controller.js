import dotenv from "dotenv";
import Faculty from "../models/Faculty.model.js";
import Approval from "../models/Approval.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

dotenv.config();

const registerFaculty = async (req, res, next) => {
  try {
    const { name, email, profilePic, type } = req.body;

    if (name && email && profilePic && type) {
      const faculty = await Faculty.create({
        name,
        email,
        profilePic,
        type,
      });
      const user = await User.find({ email: email });
      console.log(user)
      if (user) {
        const newUser = await User.findByIdAndUpdate(user._id, {
          name: name,
          email: email,
          profilePic: profilePic,
          type: type,
        }, {new: true});
        
      } else {
        User.create({
          name: name,
          email: email,
          profilePic: profilePic,
          type: type,
        });
      }
      res.status(201).json({
        success: true,
        faculty: faculty,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getFacultyById = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    console.log("facultyId");
    console.log(facultyId);
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty not found",
      });
    }
    res.status(200).json({
      success: true,
      faculty: faculty,
    });
  } catch (error) {
    next(error);
  }
};

const getFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.find({});
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }
    return res.status(200).json({
      success: true,
      faculty: faculty,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    console.log("facultyId");
    console.log(facultyId);

    await Faculty.findByIdAndDelete(facultyId);
    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const AllApproveReq = async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const ApprovalRequests = await Approval.find({ userId: facultyId });
    var requests = [];
    for (var i = 0; i < ApprovalRequests.length; i++) {
      var event = await Event.findById(ApprovalRequests[i].eventId);
      requests.push(event);
    }

    return res.status(200).json({
      success: true,
      ApprovalRequests: requests,
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerFaculty,
  getFaculty,
  deleteFaculty,
  getFacultyById,
  AllApproveReq,
};
