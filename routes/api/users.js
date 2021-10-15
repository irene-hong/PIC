const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// route: /api/users

// 注册用户
// POST /api/users
router.post(
  "/",
  check("username", "用户名不能为空").notEmpty(),
  check("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("请输入有效邮箱"),
  check("password", "密码长度需不少于6个字符").isLength({ min: 6 }),
  async (req, res) => {
    // 0. validate req.body data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { username, email, password } = req.body;
      console.log(password);
      try {
        // 1. check if user already exists
        let user = await User.findOne({ email: email });
        if (user) {
          return res.status(400).json({ errors: [{ msg: "用户已经存在!" }] });
        }
        // 2. create user and save
        const avatar = gravatar.url(email, {
          s: "200",
          d: "mm",
        });
        user = new User({ username, email, password, avatar });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // 3. generate json web token
        const payload = {
          user: {
            id: user._id,
          },
        };
        const secret = process.env.jwtSecret || config.get("jwtSecret");
        jwt.sign(payload, secret, { expiresIn: 60 * 60 }, (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        });

        // res.send("registration success!");
      } catch (e) {
        console.log(e.message);
        res.status(500).send("Server error!");
      }
    }
  }
);

module.exports = router;
