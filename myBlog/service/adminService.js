const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const jwtAccessTtl = process.env.JWT_ACCESS_TTL;

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        return { success: false, message: "일치하는 사용자가 없습니다." };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return { success: false, message: "일치하는 사용자가 없습니다." };
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret,  { expiresIn: jwtAccessTtl });
    return { success: true, token };
};

const logout = (res) => {
    res.clearCookie("token");
}

module.exports = {
    login,
    logout
};
