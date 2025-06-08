const express = require("express");
const asyncHandler = require("express-async-handler");
const adminController = require("../controllers/adminController");
const { checkLogin } = require("../utils/authUtil");
const router = express.Router();

router.route("/admin")
    .get(adminController.getAdminPage)
    .post(asyncHandler(adminController.login));

router.get("/allPosts", checkLogin, asyncHandler(adminController.getAllPosts));

router.get("/logout", adminController.logout);

router.route("/add")
    .get(checkLogin, asyncHandler(adminController.getAddPostPage))
    .post(checkLogin, asyncHandler(adminController.addPost));

router.route("/edit/:id")
    .get(checkLogin, asyncHandler(adminController.getEditPostPage))
    .put(checkLogin, asyncHandler(adminController.editPost));

router.delete("/delete/:id", checkLogin, asyncHandler(adminController.deletePost));

module.exports = router;