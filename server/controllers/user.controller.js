import dotenv from "dotenv";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
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
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({ email });
    console.log(user);
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
};

const getUser = (req, res, next) => {
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
};

export { registerUser, login, getUser };
