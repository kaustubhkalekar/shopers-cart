import jwt from "jsonwebtoken";
import asyncHanlder from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHanlder(async (req, res, next) => {
  let token;

  // Read the jwt from cookie
  token = req.cookies.jwt;

  if(token){
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        console.log("error in middlewar:",error)
        res.status(401);
    throw new Error('Not authorized, token failed');
    }
  }else{
    res.status(401);
    throw new Error('Not authorized, not token');
  }
});


// Admin middleware
const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Not authorised as admin');
    }
}

export {protect,admin};
