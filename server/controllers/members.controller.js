import dotenv from "dotenv";
import CommitteeMember from "../models/committee.member.model.js";
dotenv.config();

const createMember = async (req, res) => {
  try {
    const { email, committeeName, role } = req.body;
    if (email && committeeName && role) {
      const member = CommitteeMember.create({ email, committeeName, role });
      res
        .status(201)
        .json({ message: "Member created successfully", member: member });
    } else {
      res.status(400).json({ message: "Please fill all details" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const { committeeName } = req.query;
    const members = await CommitteeMember.find({
      committeeName: committeeName,
    });
    return res.status(200).json({
      success: true,
      members: members,
    });
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await CommitteeMember.findById(memberId);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    res.status(200).json({
      success: true,
      member: member,
    });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const updatedmember = await CommitteeMember.findByIdAndUpdate(
      memberId,
      req.body,
      { new: true }
    );
    if (!updatedmember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      member: updatedmember,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const deletedMember = await CommitteeMember.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
      member: deletedMember,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
