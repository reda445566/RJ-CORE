import express from "express";
import mongoose from "mongoose";

 export const connectDB  = async (req,res)=>{

    try{
      await  mongoose.connect(process.env.DB_URL)
      console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err)
   console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
    

    }
}



