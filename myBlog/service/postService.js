const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
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

module.exports = {
    fetchAllPosts,
    fetchPostById
};
