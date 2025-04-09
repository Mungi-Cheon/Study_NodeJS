const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const Constants = require("../constants/MessageConstants");

// Get login page
// Get /
const getLogin = (req, res) => {
    res.render("home");
}

// Login user
// POST /
const loginUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body; 
    const user = await User.findOne({username});
    if (!user){
        return res.json( {message : Constants.ERROR_MESSAGE_LOGIN});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({message : Constants.ERROR_MESSAGE_LOGIN});
    }

    const token = jwt.sign({id: user._id}, jwtSecret);
    res.cookie("token", token, {httpOnly: true});
    res.redirect("/contacts");
});

// Register page
// GET /register
const getRegister = (req, res) => {
    res.render("register");
}


// Register user
// POST /register
const registerUser = asyncHandler( async(req, res) =>{
    const {username, password, password2} = req.body;
    if(password === password2){
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, password:hashedPassword});
        res.json({message: Constants.SUCCESS_MESSAGE_REGISTER, user});
    }else{
        res.send(Constants.ERROR_MESSAGE_REGISTER);
    }
})

module.exports = {getLogin, loginUser, getRegister, registerUser};