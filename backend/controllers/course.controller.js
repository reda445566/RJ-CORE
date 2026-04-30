import courseModel from "../models/datacourse/course.model.js";
import lessonModel from "../models/datacourse/lesson.model.js";
import enrollmentModel from "../models/datacourse/enrollment.model.js";
import asyncHandler from "express-async-handler";

// Create Course
export const createcourse = asyncHandler(async (req, res) => {
  const course = await courseModel.create({
    ...req.body,
    instructor: req.user._id,
  });
  if (!course) {
    return res.status(400).json({ message: "Course not created" });
  }
  res.status(201).json({
    success: true,
    data: course,
  });
});
// Get All Courses
export const getallcourses = asyncHandler(async (req, res) => {
  const { category, level, page = 1, limit = 10 } = req.query;
  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (level) filter.level = level;
  const courses = await courseModel
    .find(filter)
    .populate("instructor", "name avatar")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const total = await courseModel.countDocuments(filter);
  res.json({
    success: true,
    data: courses,
    total,
    page: Number(page),
  });
});
// Get Course By ID
export const getcourseid = asyncHandler(async (req, res) => {
  const course = await courseModel
    .findById(req.params.id)
    .populate("instructor", "name avatar bio");
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  const lessons = await lessonModel
    .find({ course: course._id })
    .sort("order")
    .select("-body");
  res.json({
    success: true,
    data: { ...course.toObject(), lessons },
  });
});
// Update Course
export const updatecourse = asyncHandler(async (req, res) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  const updated = await courseModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({
    success: true,
    data: updated,
  });
});
// Delete Course
export const deletecourse = asyncHandler(async (req, res) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  await course.deleteOne();
  res.json({
    success: true,
    message: "Course deleted",
  });
});

// Create Lesson
export const createLesson = asyncHandler(async (req, res) => {
  const course = await courseModel.findById(req.params.courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructor.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }
  const lesson = await lessonModel.create({
    ...req.body,
    course: course._id,
  });
  res.status(201).json({
    success: true,
    data: lesson,
  });
});
// Get Lessons
export const getLessons = asyncHandler(async (req, res) => {
  const lessons = await lessonModel
    .find({ course: req.params.id })
    .sort("order");

  res.status(200).json({
    success: true,
    data: lessons,
  });
});

// Enroll Course
export const enrollCourse = asyncHandler(async (req, res) => {
  const existing = await enrollmentModel.findOne({
    user: req.user._id,
    course: req.params.id,
  });

  if (existing) {
    return res.status(400).json({ message: "Already enrolled" });
  }

  const enrollment = await enrollmentModel.create({
    user: req.user._id,
    course: req.params.id,
  });

  res.status(201).json({
    success: true,
    data: enrollment,
  });
});
// Get My Courses
export const getMyCourses = asyncHandler(async (req, res) => {
  const enrollments = await enrollmentModel
    .find({ user: req.user._id })
    .populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "name avatar",
      },
    });

  res.status(200).json({
    success: true,
    data: enrollments,
  });
});


