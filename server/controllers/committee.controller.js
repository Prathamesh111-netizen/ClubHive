import dotenv from "dotenv";
import Committee from "../models/Committee.model.js";
import User from "../models/user.model.js";
dotenv.config();

const getAllCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.find({});
    res.status(200).json({
      success: true,
      committee: committee,
    });
  } catch (error) {
    next(error);
  }
};

const getCommitteeById = async (req, res, next) => {
  try {
    const { committeeId } = req.params;
    const committee = await Committee.findById(committeeId);
    res.status(200).json({
      success: true,
      committee: committee,
    });
  } catch (error) {
    next(error);
  }
};

const createCommittee = async (req, res, next) => {
  try {
    const { name, description, presidentEmail, profilePic, type } = req.body;
    if (name && description && presidentEmail && profilePic) {
      const committee = await Committee.create({
        name,
        description,
        presidentEmail,
        profilePic,
        type,
      });

      const user = await User.findOne({ email: presidentEmail });
      if (user) {
         User.findByIdAndUpdate(user._id, { committee: name });
      } else {
         User.create({
          email: presidentEmail,
          committee: name,
          type : "President"
        });
      }

      res.status(201).json({
        success: true,
        message: "Committee created successfully",
        committee: committee,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateCommittee = async (req, res) => {
  try {
    const { committeeId } = req.params;
    var { name, description, presidentEmail, profilePic } = req.body;

    const committee = await Committee.findById(committeeId);
    if (!committee) {
      return res.status(404).json({
        success: false,
        message: "Committee not found",
      });
    }

    name = name || committee.name;
    description = description || committee.description;
    presidentEmail = presidentEmail || committee.presidentEmail;
    profilePic = profilePic || committee.profilePic;

    const updatedCommittee = await Committee.findByIdAndUpdate(
      committeeId,
      {
        name,
        description,
        presidentEmail,
        profilePic,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Committee updated successfully",
      committee: updatedCommittee,
    });
  } catch (error) {}
};

const deleteCommittee = async (req, res) => {
  try {
    const { committeeId } = req.params;
    await Committee.findByIdAndDelete(committeeId);
    return res.status(200).json({
      success: true,
      message: "Committee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCommittee,
  getCommitteeById,
  createCommittee,
  updateCommittee,
  deleteCommittee,
};
