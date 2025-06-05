const express = require("express");
const router = express.Router();
const {
    getAllPost,
    getAboutPage,
    getPostDetail
} = require("../controllers/postController");


router.get(["/","/home"], getAllPost);
router.get("/about", getAboutPage);
router.get("/posts/:id", getPostDetail);

module.exports = router;