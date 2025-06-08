const Post = require("../models/Post");

/**
 * 게시글 전체 조회
 */
const fetchAllPosts = async () => {
    const posts = await Post.find().sort({ createdAt: -1 });
    return posts.map(post => ({
        ...post._doc,
        formattedDate: post.createdAt.toISOString().split('T')[0],
    }));
};

/**
 * 특정 게시글 조회
 * @param {string} id
 */
const fetchPostById = async (id) => {
    return await Post.findOne({ _id: id });
};



const createPost = async (title, body) => {
    await Post.create({ title, body });
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
    fetchAllPosts,
    fetchPostById,
    createPost,
    updatePost,
    deletePost
};
