const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

//@desc Login a User
//@route /api/users/login
//@access public
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password.");
    }
});

const getUserProfile = asyncHandler(async (req,res) => {
    const user = req.user;
    if(user){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
        res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})



module.exports = {
    authUser,
    getUserProfile
}