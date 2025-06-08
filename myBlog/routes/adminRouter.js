const express = require("express");
const asyncHandler = require("express-async-handler");
const adminController = require("../controllers/adminController");
const { checkLogin } = require("../utils/authUtil");
const router = express.Router();

router.route("/admin")
    .get(adminController.getAdminPage)
    .post(asyncHandler(adminController.login));

router.get("/logout", adminController.logout);

router.get("/about", adminController.getAboutPage);

module.exports = router;