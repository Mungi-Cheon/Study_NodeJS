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

const getPostDetail = async (req, res) => {
    const layout = isAdmin(req) ? adminLayout : mainLayout;
    const data = await postService.fetchPostById(req.params.id);
    res.render("post/post", { data, layout });
};

const getAllPostByAdmin = async (req, res) => {
    const locals = { title: "Posts" };
    const data = await postService.fetchAllPosts();
    res.render("admin/allPosts", { locals, data, layout: adminLayout });
};

const getAddPostPage = (req, res) => {
    const locals = { title: "게시물 작성" };
    res.render("admin/add", { locals, layout: adminLayout });
};

const addPost = async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.send("'필수 항목목이 입력되지 않았습니다.'");
    }
    await postService.createPost(title, body);
    res.redirect("/allPosts");
};

const getEditPostPage = async (req, res) => {
    const locals = { title: "게시물 수정" };
    const data = await postService.fetchPostById(req.params.id);
    res.render("admin/edit", { locals, data, layout: adminLayout });
};

const editPost = async (req, res) => {
    await postService.updatePost(req.params.id, req.body);
    res.redirect("/allPosts");
};

const deletePost = async (req, res) => {
    await postService.deletePost(req.params.id);
    res.redirect("/allPosts");
};

module.exports = {
    getAllPost,
    getPostDetail,
    getAllPostByAdmin,
    getAddPostPage,
    addPost,
    getEditPostPage,
    editPost,
    deletePost,
};
