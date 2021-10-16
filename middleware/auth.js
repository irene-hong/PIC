const jwt = require("jsonwebtoken");
const config = require("config");

// auth中间件：获取req.header中的token，通过jwt转换为用户id并保存在req.userid中

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("no token");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const secret = process.env.jwtSecret || config.get("jwtSecret");
    const decoded = jwt.verify(token, secret);
    req.userid = decoded.user.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token无效!" });
  }
};
