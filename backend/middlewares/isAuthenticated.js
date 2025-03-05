import jwt from "jsonwebtoken";
const isAuthenticated = async (req,res,next)=>
{
    try{
     const token = req.cookies.token ;
     if(!token){
        return res.status(401).json({
            message:"User not Authenticated",
            succcess:true
        })
     }
     const decode = await jwt.verify(token, proccess.env.SECRET_KEY);
     if(!decode){
        return res.status(401).json({
            message:"invalid token",
            success:false
        })
     };
     req.id  = decode.userId;
     next();
    }
    catch(error){
    console.log(error);
    
    }
}