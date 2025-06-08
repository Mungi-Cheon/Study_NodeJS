const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const postController = require("../controllers/postController");
const { checkLogin } = require("../utils/authUtil");


router.get(["/","/home"], asyncHandler(postController.getAllPost));

router.get("/posts/:id", asyncHandler(postController.getPostDetail));

router.get("/allPosts", checkLogin, asyncHandler(postController.getAllPostByAdmin));

router.route("/add")
    .get(checkLogin, asyncHandler(postController.getAddPostPage))
    .post(checkLogin, asyncHandler(postController.addPost));

router.route("/edit/:id")
    .get(checkLogin, asyncHandler(postController.getEditPostPage))
    .put(checkLogin, asyncHandler(postController.editPost));

router.delete("/delete/:id", checkLogin, asyncHandler(postController.deletePost));

module.exports = router;