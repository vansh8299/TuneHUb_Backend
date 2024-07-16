const User = require("../Model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (email, password, role = "user") => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = new User({ email, password, role });
    await newUser.save();
    return "User registered successfully";
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password, role = "user") => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email");
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    if (role && user.role !== role) {
      throw new Error("Invalid role");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

exports.getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userProfile = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    return userProfile;
  } catch (error) {
    throw error;
  }
};
