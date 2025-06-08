const postService = require("../service/postService.js");
const mainLayout = "../views/layouts/main.ejs";
const adminLayout = "../views/layouts/admin-login.ejs";
const { isAdmin } = require("../utils/authUtil");

const getAllPost = async (req, res) => {
    const layout = isAdmin(req) ? adminLayout : mainLayout;
    const locals = { title: "Home" };
    const data = await postService.fetchAllPosts();
    res.render("post/index", { locals, data, layout: layout });
};

const getAboutPage = (req, res) => {
    const layout = isAdmin(req) ? adminLayout : mainLayout;
    const locals = { title: "About" };
    res.render("post/about", { locals, layout: layout });
};

const getPostDetail = async (req, res) => {
    const layout = isAdmin(req) ? adminLayout : mainLayout;
    const data = await postService.fetchPostById(req.params.id);
    res.render("post/post", { data, layout });
};

module.exports = {
    getAllPost,
    getAboutPage,
    getPostDetail,
};
