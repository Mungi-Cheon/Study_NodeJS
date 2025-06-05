const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const adminLayout = "../views/layouts/admin.ejs";
const adminNoLogoutLayout = "../views/layouts/admin-nologout.ejs";
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

/**
 * Check Login
 */
const checkLogin = (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        res.redirect("/admin");
    }else{
        try{
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        }catch(error){
            res.redirect("/admin");
        }
    }
}

/**
 * Admin Page
 * Get /admin
 */
router.get("/admin", (req, res)=>{
    const locals = {
        title: "관리자 페이지"
    }
    res.render("admin/index",{locals, layout: adminNoLogoutLayout});
});

/**
 * Check Login
 * Post /admin
 */
router.post("/admin", asyncHandler(async (req, res) =>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(401).json({message : "일치하는 사용자가 없습니다."});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(401).json({message : "일치하는 사용자가 없습니다."});
    }

    const token = jwt.sign({id:user._id}, jwtSecret);
    res.cookie("token", token, {httpOnly:true});
    res.redirect("/allPosts");
}));

/**
 * View Register Form
 * Get /register
 */
router.get("/register", asyncHandler(async (req, res) =>{
    res.render("admin/index", {layout: adminNoLogoutLayout});
}));

/**
 * Register Administorator
 * Post /register
 */
router.post("/register", asyncHandler(async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        username : req.body.username,
        password : hashedPassword
    });
}));

/**
 * Get all Posts
 * Get /allPosts
 */
router.get("/allPosts", checkLogin, asyncHandler(async(req, res)=>{
    const locals = {
        title : "Posts"
    };
    
    const data = await Post.find().sort({ createdAt: -1 });
    const formattedData = data.map(post => ({
    ...post._doc,
    formattedDate: post.createdAt.toISOString().split('T')[0]  // "YYYY-MM-DD"
}));

    res.render("admin/allPosts", {locals, data:formattedData, layout:adminLayout});
}));

/**
 * Admin Logout
 * Get /logout
 */
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
})

/**
 * Admin Add Get
 * Get /add
 */
router.get("/add", checkLogin, asyncHandler(async(req, res) => {
    const locals = {
        title : "게시물 작성"
    };
    res.render("admin/add", {locals, layout: adminLayout});
}))


/**
 * Add Post
 * Post /add
 */
router.post("/add", checkLogin, asyncHandler(async (req, res) => {
    const {title, body} = req.body;
    if(!title || !body){
        return res.send("'필수 항목목이 입력되지 않았습니다.'");
    }
    const post = await Post.create({title, body});
    res.redirect("/allPosts");
}));

/**
 * Admin Edit Get
 * Get /edit/:id
 */
router.get("/edit/:id", checkLogin, asyncHandler(async (req, res) => {
    const locals = {
        title : "게시물 수정"
    };
    const data = await Post.findOne({_id: req.params.id});
    res.render("admin/edit", {locals, data, layout: adminLayout});
}));

/**
 * Admin Edit Post
 * Put /edit/:id
 */
router.put("/edit/:id", checkLogin, asyncHandler(async (req, res) =>{
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        createdAt: Date.now()
    });
    res.redirect("/allPosts");
}));

/**
 * Admin Delete Post
 * Delete /delete/:id
 */
router.delete("/delete/:id", checkLogin, asyncHandler(async (req, res) =>{
    await Post.deleteOne({_id: req.params.id});
    res.redirect("/allPosts");
}));


module.exports = router;