import dotenv from "dotenv";
import Committee from "../models/Committee.model.js";
dotenv.config();

const getAllCommittee = async (req, res) => {
  try {
    const committee = await Committee.find({});
    res.status(200).json({
      success: true,
      committee: committee,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const getCommitteeById = async (req, res) => {
  try {
    const { committeeId } = req.params;
    const committee = await Committee.findById(committeeId);
    res.status(200).json({
      success: true,
      committee: committee,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const createCommittee = async (req, res) => {
  const { name, description, presidentEmail, profilePic, type } = req.body;
  if (name && description && presidentEmail && profilePic) {
    const committee = await Committee.create({
      name,
      description,
      presidentEmail,
      profilePic,
      type,
    });
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
};

const updateCommittee = async (req, res) => {
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
};

const deleteCommittee = async (req, res) => {
  try {
    const { committeeId } = req.params;
    Committee.findByIdAndDelete(committeeId);
    return res.status(200).json({
      success: true,
      message: "Committee deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export {
  getAllCommittee,
  getCommitteeById,
  createCommittee,
  updateCommittee,
  deleteCommittee,
};