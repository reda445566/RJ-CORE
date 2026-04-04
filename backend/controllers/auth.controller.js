import usermodel from "../models/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
export const signup =asyncHandler(async (req,res)=>{

     const {name,email,password} = req.body
      // validate
    if (!name || !email || !password) {
      res.status(400);
  throw new Error("All fields are required");
    }
    // هتاكد انه مش موجود في الداتا 
    const exsistinguser = await usermodel.findOne({email})
    if(exsistinguser){
     res.status(400);
  throw new Error("User already exists");;

    }
    // تشفير الباسورد 
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

// create date
const user = await usermodel.create({
      name,
      email,
      password: hashedPassword,

})
 // إنشاء توكن JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
})
  
export const login = (req,res)=>{


}

