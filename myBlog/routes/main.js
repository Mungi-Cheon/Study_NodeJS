const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
/**
 * 레이아웃 결정
 * @param {*} req 
 * @returns 
 */
const determineLayout = (req) => {
    const token = req.cookies?.token;

    if (!token){
        return mainLayout;  
    } 
    try {
        jwt.verify(token, jwtSecret);
        return adminLayout; // 토큰만 유효하면 adminLayout
    } catch (e) {
        return mainLayout; // 유효하지 않으면 mainLayout
    }
};



router.get(["/","/home"], asyncHandler( async (req, res) => {
    const locals = {
        title: "Home"
    }

    const data = await Post.find();
    res.render("index", {locals: locals, data, layout: mainLayout});
}));

router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    }
    res.render("about", {locals, layout: mainLayout});
});

/**
 * 게시물 상세 보기
 * Get /posts/:id
 */
router.get("/posts/:id", asyncHandler( async (req, res) => {
    const layout = determineLayout(req);
    const data = await Post.findOne({_id: req.params.id});
    res.render("post", {data, layout: layout});
}))


module.exports = router;