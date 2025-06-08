const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtAccessTtl = process.env.JWT_ACCESS_TTL;

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        return { success: false, message: "일치하는 사용자가 없습니다." };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return { success: false, message: "일치하는 사용자가 없습니다." };
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret,  { expiresIn: jwtAccessTtl });
    return { success: true, token };
};

const getAllPost = async () => {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts.map(post => ({
        ...post._doc,
        formattedDate: post.createdAt.toISOString().split('T')[0],
    }));
};

const createPost = async (title, body) => {
    await Post.create({ title, body });
};

const getPostById = async (id) => {
    return await Post.findOne({ _id: id });
};

const updatePost = async (id, body) => {
    await Post.findByIdAndUpdate(id, {
        title: body.title,
        body: body.body,
        createdAt: Date.now(),
    });
};

const deletePost = async (id) => {
    await Post.deleteOne({ _id: id });
};

module.exports = {
    login,
    register,
    getAllPost,
    createPost,
    getPostById,
    updatePost,
    deletePost,
};
