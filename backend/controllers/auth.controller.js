import usermodel from "../models/user.model"
import bcrypt from "bcrypt";
export const signup = async (req,res)=>{
    try{
        const {name,email,password} = req.body
      // validate
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // هتاكد انه مش موجود في الداتا 

    const exsistinguser = await usermodel.findOne({email})
    if(exsistinguser){
     return res.status(400).json({ message: "User already exists" });

    }
    // تشفير الباسورد 
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

// create date
const user = await usermodel.create({
      name,
      email,
      password: hashedPassword,

})

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
// errorhandling
}catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
