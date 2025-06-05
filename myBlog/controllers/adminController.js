const adminService = require("../service/adminService");
const adminLayout = "../views/layouts/admin.ejs";
const adminNoLogoutLayout = "../views/layouts/admin-nologout.ejs";

const getAdminPage = (req, res) => {
    const locals = { title: "관리자 페이지" };
    res.render("admin/index", { locals, layout: adminNoLogoutLayout });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await adminService.login(username, password);

    if (!result.success) {
        return res.status(401).json({ message: result.message });
    }

    res.cookie("token", result.token, { httpOnly: true });
    res.redirect("/allPosts");
};

const getRegisterPage = async (req, res) => {
    res.render("admin/index", { layout: adminNoLogoutLayout });
};

const register = async (req, res) => {
    await adminService.register(req.body.username, req.body.password);
    res.redirect("/admin");
};

const getAllPosts = async (req, res) => {
    const locals = { title: "Posts" };
    const data = await adminService.getAllPost();
    res.render("admin/allPosts", { locals, data, layout: adminLayout });
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
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
    await adminService.createPost(title, body);
    res.redirect("/allPosts");
};

const getEditPostPage = async (req, res) => {
    const locals = { title: "게시물 수정" };
    const data = await adminService.getPostById(req.params.id);
    res.render("admin/edit", { locals, data, layout: adminLayout });
};

const editPost = async (req, res) => {
    await adminService.updatePost(req.params.id, req.body);
    res.redirect("/allPosts");
};

const deletePost = async (req, res) => {
    await adminService.deletePost(req.params.id);
    res.redirect("/allPosts");
};

module.exports = {
    getAdminPage,
    login,
    getRegisterPage,
    register,
    getAllPosts,
    logout,
    getAddPostPage,
    addPost,
    getEditPostPage,
    editPost,
    deletePost,
};