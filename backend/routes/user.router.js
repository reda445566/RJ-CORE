import express from "express";
import { getme, updateme } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get current user profile
router.get("/me", protect, getme);

// update current user profile
router.put("/me", protect, updateme);

export default router;

