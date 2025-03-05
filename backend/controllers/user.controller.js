import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const user = await UserfindOne({ email });
    if (user) {
      return res.status(400).json({
        mesagge: "user already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      mesagge: "Account created Succesfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        mesagge: "incorrect email or password",
        success: false,
      });
    }
    const isPaaswordMatch = await bcrypt.compare(password, user.password);
    if (!isPaaswordMatch) {
      return res.status(400).json({
        mesagge: "incorrect email or password",
        success: false,
      });
    }
    //check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, procees.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user_.id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        mesagge: `Welcome Back  ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req,res)=>
{
    try{
    return res.status (200).cookie ("token", "",{maxAge:0}).json({
        mesagge:"Logged Out Successfully ",
        success:true
    })
    }
    catch(error){
      console.log(error );
      
    }
}

export const updateProfile = async (req,res)=>
{
    try{
        const { fullname,email,phoneNumber, bio,skills} = req.body;
        const file =req.file;
        if (!email || !fullname|| !phoneNumber || !bio||!skills) {
          return res.status(400).json({
            message: "something is missing",
            success: false,
          });
        };
        //coludinary ayga idhr 
    
        const skillsArray =skills.split(",");
        const userId = req.id ; //midlleware authentication
        let user = await User.findById(userId);
        if(!user){

   return res.status(400).json({
            message: "User not Found",
            success: false,
   })
     }
     //updating data
     user.fullname =fullname,
     user.email =email,
     user.phoneNumber =phoneNumber,
     user.profile.bio =bio,
     user.profile.skills =skillsArray,

  //resume comes later 
     
     await user.save();
    
     user = {
        _id: user_.id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
   return res.status(200).json({
    mesagge:"Profile Updated Succesfully,",
    user,
    success:true,
   })

      } 
       catch (error){
        console.log(erorr);
        
    }
}
