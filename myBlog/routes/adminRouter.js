const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminController = require("../controllers/adminController");
const { checkLogin } = require("../utils/authUtil");
const adminLoginLayout = "../views/layouts/admin-login.ejs";
const adminNoLoginLayout = "../views/layouts/admin-nologin.ejs";
const mainLayout = "../views/layouts/main.ejs";

router.route("/admin")
    .get((req, res) => {
        const locals = { title: "관리자 페이지" };
        res.render("admin/login", { locals, layout: adminNoLoginLayout });
    })
    .post(asyncHandler(adminController.login));

router.route("/logout").get(adminController.logout);

router.route("/about").get((req, res) => {
    const layout = isAdmin(req) ? adminLoginLayout : mainLayout;
    const locals = { title: "About" };
    res.render("admin/about", { locals, layout: layout });
});

module.exports = router;