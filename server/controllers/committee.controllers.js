import dotenv from "dotenv";
import Committee from "../models/Committee.model.js";
dotenv.config();

const getAllCommittee = async (req, res, next) => {
  try {
    const committees = await Committee.find({});
    res.status(200).json({
      success: true,
      committees: committees,
    });
  } catch (error) {
    next(error);
  }
};

const getCommittee = async (req, res, next) => {
  try {
    const { committeeId } = req.params;
    const committe = await Committee.findById(committeeId);
    if (!committe) {
      return res.status(404).json({
        success: false,
        message: "Committee not found",
      });
    }
    res.status(200).json({
      success: true,
      committe: committe,
    });
  } catch (error) {
    next(error);
  }
};

const createCommittee = async (req, res, next) => {
  try {
    var { name, description, profilePic, presidentEmail } = req.body;
    name = name || "";
    description = description || "";
    profilePic = profilePic || "";
    presidentEmail = presidentEmail || "";

    const committee = await Committee.create({
      name,
      description,
      profilePic,
      presidentEmail,
    });
    res.status(201).json({
      success: true,
      committee: committee,
    });
  } catch (error) {
    next(error);
  }
};
