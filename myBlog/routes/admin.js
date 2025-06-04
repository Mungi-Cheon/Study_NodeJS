const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const adminLayout = "../views/layouts/admin.ejs";
const adminNoLogoutLayout = "../views/layouts/admin-nologout.ejs";
const router = express.Router();

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

module.exports = router;