import express from "express";
import * as courseController from "../controllers/course.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, courseController.createcourse);


router.get("/", courseController.getallcourses);

router.get("/:id", courseController.getcourseid);

router.put("/:id", authMiddleware, courseController.updatecourse);

router.delete("/:id", authMiddleware, courseController.deletecourse);


router.post(
  "/:courseId/lessons",
  authMiddleware,
  courseController.createLesson
);

router.get("/:id/lessons", courseController.getLessons);


// enroll in course
router.post(
  "/:id/enroll",
  authMiddleware,
  courseController.enrollCourse
);

router.get(
  "/my/courses",
  authMiddleware,
  courseController.getMyCourses
);


export default router;


