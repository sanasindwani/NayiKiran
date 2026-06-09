import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    const { fullname, username, password, confirmPassword } = req.body;

    // Validate input
    if (!fullname || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
    });

    if (newUser) {
      // Save first, then generate JWT token
      await newUser.save();
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password ||"");

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token and set it in cookie
    generateTokenAndSetCookie(user._id, res);
    

    // Log the generated token for debugging
    console.log('Generated token:', req.cookies.jwt); // or console log token directly if returned from generateTokenAndSetCookie

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logged out succesfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
