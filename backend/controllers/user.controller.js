import expressAsyncHandler from "express-async-handler"
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";

// Get My Profile
export const getme = asyncHandler(async(req,res)=>{
 const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404).json({message:"user not found"})
  }
   res.status(200).json({
      success: true,
      data: user,
    });
})

// updateprofile
export const updateme = asyncHandler(async(req,res)=>{
    const user = await userModel.findByIdAndUpdate(
         req.user._id,
    req.body,
    { new: true, runValidators: true }
  ).select("-password");    

  if (!user) {
    res.status(404).json({message:"user not found"})
  }
  res.status(200).json({
    success: true,
    data: user,
  });

})
