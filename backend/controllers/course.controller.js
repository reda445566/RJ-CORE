import courseModel from "../models/datacourse/course.model";
import enrollmentModel from "../models/datacourse/enrollment.model";
import lessonModel from "../models/datacourse/lesson.model";
import quizModel from "../models/datacourse/quiz.model";
import expressAsyncHandler from "express-async-handler";
import asyncHandler from "express-async-handler"

// --- Courses ---
export const createcourse = asyncHandler(async(req,res)=>{
    const cousre = await courseModel.create({...req.body, instructor: req.user._id })
      res.status(201).json({ success: true, data: course });

})

// get courses
 export const getallcourses = asyncHandler(async(req,res)=>{

      const { category, level, page = 1, limit = 10 } = req.query;
       const filter = { isPublished: true };
    if (category) filter.category = category;
    if (level) filter.level = level;
    const courses = await Course.find(filter)
      .populate('instructor', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
      if(!courses){
        res.status(400).json({message:"page is empty"})

      }
 const total = await Course.countDocuments(filter);
    res.json({ success: true, data: courses, total, page: Number(page) });
 })

 // get course by id

 const getcourseid = asyncHandler(async(req,res)=>{

  const course = await Course.findById(req.params.id)
  .populate('instructor', 'name avatar bio');

if(!course){
  throw new AppError("Course not found", 404);
}
const lessons = await Lesson.find({ course: course._id })
  .sort('order')
  .select('-body');
   res.json({ success: true, data: { ...course.toObject(), lessons } });

 })

 //update course 

export const updatecourse = asyncHandler(async(req,res)=>{

 const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });

})

export const deletecourse = asyncHandler(async(req,res)=>{
 const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await course.deleteOne();
    res.json({ success: true, message: 'Course deleted' });

})

