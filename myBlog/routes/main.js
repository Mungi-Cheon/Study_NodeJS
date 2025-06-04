const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");

router.get(["/","/home"], (req, res) => {
    const locals = {
        title: "Home"
    }
    res.render("index", {locals: locals, layout: mainLayout});
});

router.get("/about", (req, res) => {
    const locals = {
        title: "About"
    }
    res.render("about", {locals, layout: mainLayout});
});

module.exports = router;