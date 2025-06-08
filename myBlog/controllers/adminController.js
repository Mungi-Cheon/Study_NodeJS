const adminService = require("../service/adminService");
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

module.exports = {
    login,
    logout,
};