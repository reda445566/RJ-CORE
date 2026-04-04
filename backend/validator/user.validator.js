import { body } from "express-validator";
import { ROLES } from "../models/user.model.js";

// فالديشن للـ signup
export const signupValidator = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3, max: 50 }).withMessage("Name must be between 3 and 50 characters"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(Object.values(ROLES)).withMessage(`Role must be one of: ${Object.values(ROLES).join(", ")}`)
];



