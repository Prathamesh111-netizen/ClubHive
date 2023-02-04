import dotenv from "dotenv";
import Faculty from "../models/Faculty.model.js";
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
  const { facultyId } = req.params;
  const faculty = await Faculty.findById(facultyId);
  if (!faculty) {
    res.status(400).json({
      success: false,
      message: "Faculty not found",
    });
  }
  res.status(200).json({
    success: true,
    faculty: faculty,
  });
};

const getFaculty = async (req, res, next) => {
  const faculty = await Faculty.find({});
  if (!faculty) {
    res.status(404).json({
      success: false,
      message: "Faculty not found",
    });
  }
  res.status(200).json({
    success: true,
    faculty: faculty,
  });
};

const deleteFaculty = async (req, res, next) => {
  const { facultyId } = req.params;
  Faculty.findByIdAndDelete(facultyId);
  res.status(200).json({
    success: true,
    message: "Faculty deleted successfully",
  });
};

export { registerFaculty, getFaculty, deleteFaculty, getFacultyById };
