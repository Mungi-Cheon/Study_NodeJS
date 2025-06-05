const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const postController = require("../controllers/postController");


router.get(["/","/home"], asyncHandler(postController.getAllPost));
router.get("/about", postController.getAboutPage);
router.get("/posts/:id", asyncHandler(postController.getPostDetail));

module.exports = router;