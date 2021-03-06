const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");

// 验证用户
// 首先经过auth中间件，将token转为req.params.userid
// GET api/auth
router.get("/", auth, async (req, res) => {
  try {
    console.log("received a request");
    const user = await User.findById(req.userid).select("-password");
    res.json(user);
    // res.send('auth route');
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(500).send("Server error!");
  }
});

// 用户登录，获得token
// POST /api/auth
router.post(
  "/",
  check("email", "please enter a valid email").isEmail(),
  check("password", "password is required").exists(),
  async (req, res) => {
    // 0. validate req.body data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        // 1. check if user exists
        let user = await User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "invalid email or password" }] });
        }
        // 2. verify user password
        const result = await bcrypt.compare(password, user.password);
        if (result == false) {
          return res
            .status(400)
            .json({ errors: [{ msg: "invalid email or password" }] });
        }

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
      } catch (e) {
        console.log(e.message);
        res.status(500).send("Server error!");
      }
    }
  }
);

module.exports = router;
