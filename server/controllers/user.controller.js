import dotenv from "dotenv";
import Committee from "../models/Committee.model.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";
import committeeMemberModel from "../models/committee.member.model.js";
import FacultyModel from "../models/Faculty.model.js";
dotenv.config();

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;
    if (name && email && password && profilePic) {
      const user = await User.create({
        name,
        email,
        password,
        profilePic,
      });
      res.status(201).json({
        success: true,
        user: user,
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let committeeHeadsEmail = await Committee.findOne({
      presidentEmail: email,
    });
    let facultyEmails = await FacultyModel.findOne({ email: email });
    let userEmails = await User.findOne({ email: email });
    let committeeMember = await committeeMemberModel.findOne({ email: email });
    if (committeeHeadsEmail) {
      const token = generateToken(committeeHeadsEmail._id);
      res.status(200).json({
        success: true,
        message: "Correct credentials",
        user: committeeHeadsEmail,
        token: token,
        type: "President",
      });
    }
    if (facultyEmails) {
      const token = generateToken(facultyEmails._id);
      res.status(200).json({
        success: true,
        message: "Correct credentials",
        user: facultyEmails,
        token: token,
        type: facultyEmails.type,
      });
    }
    if (committeeMember) {
      const token = generateToken(committeeMember._id);
      res.status(200).json({
        success: true,
        message: "Correct credentials",
        user: committeeMember,
        token: token,
        type: "Committee Member",
      });
    }
    if (userEmails) {
      const token = generateToken(userEmails._id);
      res.status(200).json({
        success: true,
        message: "Correct credentials",
        user: userEmails,
        token: token,
        type: userEmails.type,
      });
    }
    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = user.password == password;
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const token = generateToken(user._id);
      return res.status(200).json({
        success: true,
        message: "Correct credentials",
        token: token,
        user: user,
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

const getUser = (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const setFCMToken = async (req, res, next) => {
  try {
    const { name, deviceToken } = req.body.data;
    await User.findOneAndUpdate({ name: name }, { deviceToken: deviceToken });
    res.status(200).json({
      success: true,
      message: "Device token updated",
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, login, getUser, setFCMToken };
