import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const ROLES = {
  STUDENT: "student",
  MENTOR: "mentor",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.STUDENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);




