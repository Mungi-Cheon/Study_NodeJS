const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/admin");
    }
    try {
        const payload = jwt.verify(token, jwtSecret);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.redirect("/admin");
    }
};

const isAdmin = (req) => {
    const token = req.cookies?.token;

    if (!token) {
        return false;
    }

    try {
        jwt.verify(token, jwtSecret);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = { checkLogin,isAdmin };
