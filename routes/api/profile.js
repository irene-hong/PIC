const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// GET /api/profile/me
// 获得当前登录用户的档案
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userid }).populate(
      "user"
    );
    if (!profile) {
      return res.status(400).json({ msg: "user profile does not exist" });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error!");
  }
  // res.send('profile route');
});

// GET /api/profile
// 获得所有用户档案
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "avatar",
    ]);
    return res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error!");
  }
});

// GET /api/profile/:uid
// 根据用户ID获得档案
router.get("/:uid", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.uid }).populate(
      "user",
      ["username", "avatar"]
    );
    if (!profile) {
      return res.status(404).json({ msg: "用户档案不存在！" });
    }
    return res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "用户档案不存在！" });
    }
    res.status(500).send("server error!");
  }
});

// POST /api/profile
// 为当前用户创建档案
router.post(
  "/",
  auth,
  check("graduation_year", "请填写毕业年份").not().isEmpty(),
  check("skills", "请填写至少一项擅长的技能或领域").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { graduation_year, status, company, location, bio, skills, website } =
      req.body;
    const profileFields = {};
    // 必填项
    profileFields.user = req.userid;
    profileFields.graduation_year = graduation_year;
    profileFields.status = status;
    profileFields.skills = skills.split(" ").map((skill) => skill.trim());
    // 选填项
    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (website) profileFields.website = website;
    if (company) profileFields.company = company;

    // console.log(profileFields);
    try {
      let profile = await Profile.findOne({ user: req.userid });
      if (profile) {
        // 更新
        profile = await Profile.findOneAndUpdate(
          { user: req.userid },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        // 创建
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("server error");
    }
    // res.send("create profile!");
  }
);

// PUT /api/profile/professional
// 添加职业经历
router.put(
  "/professional",
  auth,
  check("title", "请填写工作岗位").not().isEmpty(),
  check("company", "请填写公司").not().isEmpty(),
  check("from", "请填写开始时间").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.userid });
      profile.professional_experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("server error");
    }
  }
);

// DELETE /api/profile/professional/:expid
// 删除职业经历
router.delete("/professional/:expid", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userid });
    const removeIndex = profile.professional_experience
      .map((exp) => exp.id)
      .indexOf(req.params.expid);
    profile.professional_experience.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

// PUT /api/profile/education
// 添加教育经历
router.put(
  "/education",
  auth,
  check("school", "请填写学校").not().isEmpty(),
  check("degree", "请填写学位").not().isEmpty(),
  check("major", "请填写专业").not().isEmpty(),
  check("from", "请填写开始时间").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, major, degree, from, to, current, description } = req.body;
    const newExp = {
      school,
      degree,
      major,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.userid });
      profile.education_experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("server error");
    }
  }
);

// DELETE /api/profile/education/:expid
// 删除教育经历
router.delete("/education/:expid", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userid });
    const removeIndex = profile.education_experience
      .map((exp) => exp._id)
      .indexOf(req.params.expid);
    profile.education_experience.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server error");
  }
});

module.exports = router;
