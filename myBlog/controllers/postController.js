const asyncHandler = require("express-async-handler");
const {
    fetchAllPosts,
    fetchPostById,
    determineLayout
} = require("../service/postService");

const mainLayout = "../views/layouts/main.ejs";

const getAllPost = asyncHandler(async (req, res) => {
    const locals = { title: "Home" };
    const data = await fetchAllPosts();
    res.render("index", { locals, data, layout: mainLayout });
});

const getAboutPage = (req, res) => {
    const locals = { title: "About" };
    res.render("about", { locals, layout: mainLayout });
};

const getPostDetail = asyncHandler(async (req, res) => {
    const layout = determineLayout(req);
    const data = await fetchPostById(req.params.id);
    res.render("post", { data, layout });
});

module.exports = {
    getAllPost,
    getAboutPage,
    getPostDetail,
};
