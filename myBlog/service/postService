const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const mainLayout = "../views/layouts/main.ejs";
const adminLayout = "../views/layouts/admin.ejs";
const jwtSecret = process.env.JWT_SECRET;

/**
 * 게시글 전체 조회
 */
const fetchAllPosts = async () => {
    return await Post.find();
};

/**
 * 특정 게시글 조회
 * @param {string} id
 */
const fetchPostById = async (id) => {
    return await Post.findOne({ _id: id });
};

/** 레이아웃 결정
 * @param {*} req 
 */
const determineLayout = (req) => {
    const token = req.cookies?.token;

    if (!token) {
        return mainLayout;
    }

    try {
        jwt.verify(token, jwtSecret);
        return adminLayout;
    } catch (e) {
        return mainLayout;
    }
};

module.exports = {
    fetchAllPosts,
    fetchPostById,
    determineLayout,
};
