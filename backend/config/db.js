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

//
function number(){

  const numbers = [1 , 2,3,4,5,6 ,7 , 8,9 ,10]
for(let i = 0 ; i <numbers.length; i++){

  return i+1;
}
}