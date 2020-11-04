const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req,res,next) => {
    let authHeader = req.headers.authorization;
    let token;
    if(authHeader && authHeader.startsWith("Bearer")){
        try{
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            next();
        }catch(error){
            console.error("Token no valido");
            res.status(401);
            throw new Error("Not authorized, Token invalid");
        }

    }

    if(!token){
        throw new Error("Not authorized, no token");
    }


});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }
  
  module.exports = { protect, admin };
  