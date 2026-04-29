import express from "express";
import * as courseController from "../controllers/course.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// create course
router.post("/", authMiddleware, courseController.createcourse);

// get all courses
router.get("/", courseController.getallcourses);

// get course by id
router.get("/:id", courseController.getcourseid);

// update course
router.put("/:id", authMiddleware, courseController.updatecourse);

// delete course
router.delete("/:id", authMiddleware, courseController.deletecourse);

// add lesson to course
router.post(
  "/:courseId/lessons",
  authMiddleware,
  courseController.createLesson
);

// get lessons of course
router.get("/:id/lessons", courseController.getLessons);


// enroll in course
router.post(
  "/:id/enroll",
  authMiddleware,
  courseController.enrollCourse
);

// get my courses
router.get(
  "/my/courses",
  authMiddleware,
  courseController.getMyCourses
);

export default router;


