const postService = require("../service/postService.js");
const mainLayout = "../views/layouts/main.ejs";

const getAllPost = async (req, res) => {
    const locals = { title: "Home" };
    const data = await postService.fetchAllPosts();
    res.render("post/index", { locals, data, layout: mainLayout });
};

const getAboutPage = (req, res) => {
    const locals = { title: "About" };
    res.render("post/about", { locals, layout: mainLayout });
};

const getPostDetail = async (req, res) => {
    const layout = postService.determineLayout(req);
    const data = await postService.fetchPostById(req.params.id);
    res.render("post/post", { data, layout });
};

module.exports = {
    getAllPost,
    getAboutPage,
    getPostDetail,
};
