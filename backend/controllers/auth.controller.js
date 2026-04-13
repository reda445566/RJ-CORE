import usermodel from "../models/USER/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // validate
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // exsistinguser
  const exsistinguser = await usermodel.findOne({ email });
  if (exsistinguser) {
    res.status(400).json({ status: "fail", message: "user in web", data: {} });
  }
  // password hashing
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  // create date
  const user = await usermodel.create({
    name,
    email,
    password: hashedPassword,
  });

  //token generate
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.status(201).json({
    status: "success",
    message: "lol",
    data: { _id: user._id, name: user.name, email: user.email, token },
  });
});
//
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // generate token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});
// delete account
export const deleteAcc = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const acc = await usermodel.findByIdAndDelete(id);
  if (!acc) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json({
    message: "Account deleted successfully",
  });
});










