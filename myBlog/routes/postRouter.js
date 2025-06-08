const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const postController = require("../controllers/postController");
const { checkLogin } = require("../utils/authUtil");
const adminLayout = "../views/layouts/admin-login.ejs";

router.get(["/", "/home"], asyncHandler(postController.getAllPost));

router.get("/posts/:id", asyncHandler(postController.getPostDetail));

router.get("/allPosts", checkLogin, asyncHandler(postController.getAllPostByAdmin));

router.route("/add")
    .get(checkLogin, (req, res) => {
        const locals = { title: "게시물 작성" };
        res.render("admin/add", { locals, layout: adminLayout });
    })
    .post(checkLogin, asyncHandler(postController.addPost));


router.route("/edit/:id")
    .get(checkLogin, async (req, res) => {
        const locals = { title: "게시물 수정" };
        const data = await postService.fetchPostById(req.params.id);
        res.render("admin/edit", { locals, data, layout: adminLayout });
    })
    .put(checkLogin, asyncHandler(postController.editPost));

router.delete("/delete/:id", checkLogin, asyncHandler(postController.deletePost));

module.exports = router;