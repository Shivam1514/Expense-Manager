import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (password.length < 6) {
      return res.status(400).json({ message: "Password length must be 6" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user)
      return res
        .status(400)
        .json({ message: "User Already Exists, Please Login" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      budget:25000
    });
    generateToken(newUser._id, res);
    await newUser.save();

    return res.status(200).json({ newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(400)
        .json({ message: "User Does not exists Try to Signup" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);
    return res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email,budget:user.budget });
  } catch (error) {}
};

export const check = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt_token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Succesfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};
