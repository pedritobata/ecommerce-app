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


//@desc gets a User profile
//@route /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req,res) => {
    const user = req.user;
    if(user){
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
       // res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})


//@desc signs up a new User in BD
//@route /api/users
//@access Private
const registerUser = asyncHandler(async (req,res,next) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists.");
    }

    const user = await User.create({
        name, 
        email, 
        password
    });
    if(user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(404);
        throw new Error("Cannot create new User");
    }
});

//@desc update a user Profile
//@route /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
       user.name = req.body.name || user.name;
       user.email = req.body.email || user.email;
       if(req.body.password){
           user.password = req.body.password;
       }

       const udatedProfile = await user.save();
       res.status(201).json(
           {
            id: udatedProfile._id,
            name: udatedProfile.name,
            email: udatedProfile.email,
            isAdmin: udatedProfile.isAdmin
           }
       );
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
}