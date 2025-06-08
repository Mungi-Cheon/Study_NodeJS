const adminService = require("../service/adminService");
const adminLoginLayout = "../views/layouts/admin-login.ejs";
const adminNoLoginLayout = "../views/layouts/admin-nologin.ejs";
const mainLayout = "../views/layouts/main.ejs";
const { isAdmin } = require("../utils/authUtil");

const login = async (req, res) => {
    const { username, password } = req.body;
    const result = await adminService.login(username, password);

    if (!result.success) {
        return res.status(401).json({ message: result.message });
    }

    res.cookie("token", result.token, { httpOnly: true });
    res.redirect("/allPosts");
};

const logout = (req, res) => {
    adminService.logout(res);
    res.redirect("/");
};

const getAdminPage = (req, res) => {
    const locals = { title: "관리자 페이지" };
    res.render("admin/login", { locals, layout: adminNoLoginLayout });
};

const getAboutPage = (req, res) => {
    const layout = isAdmin(req) ? adminLoginLayout : mainLayout;
    const locals = { title: "About" };
    res.render("admin/about", { locals, layout: layout });
};

module.exports = {
    login,
    logout,
    getAdminPage,
    getAboutPage,
};