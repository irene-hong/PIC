const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// POST api/posts
// 发布招聘帖
router.post(
  "/",
  auth,
  check("content", "content is required").not().isEmpty(),
  check("title", "title is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { content, title } = req.body;
      const user = await User.findById(req.userid).select("-password");
      const newPost = new Post({
        content: content,
        title: title,
        username: user.username,
        user_avatar: user.avatar,
        user: user._id,
      });
      const post = await newPost.save({ new: true });
      return res.json(post);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error!");
    }
  }
);

// GET /api/posts
// 获取所有招聘帖
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

// GET /api/posts/:postid
// 根据postid获取帖子
router.get("/:postid", auth, async (req, res) => {
  try {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

// DELETE /api/posts/:postid
// 根据postid删除招聘帖
router.delete("/:postid", auth, async (req, res) => {
  try {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "帖子不存在！" });
    }
    if (post.user.toString() !== req.userid) {
      return res.status(401).json({ msg: "用户没有权限" });
    }
    await post.remove();
    return res.json({ msg: "帖子删除成功" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

// PUT /api/posts/like/:postid
// 点赞
router.put("/like/:postid", auth, async (req, res) => {
  try {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // check if current user has already liked it
    if (
      post.likes.filter((like) => like.user.toString() === req.userid).length >
      0
    ) {
      return res.status(400).json({ msg: "已经点过赞！" });
    } else {
      post.likes.unshift({ user: req.userid });
      await post.save();
      return res.json(post.likes);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

// PUT /api/posts/unlike/:postid
// 取消点赞
router.put("/unlike/:postid", auth, async (req, res) => {
  try {
    const postId = req.params.postid;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // check if current user has liked it
    if (
      post.likes.filter((like) => like.user.toString() === req.userid)
        .length === 0
    ) {
      return res.status(400).json({ msg: "post has not been liked yet" });
    } else {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.userid);
      post.likes.splice(removeIndex, 1);
      await post.save();
      return res.json(post.likes);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

// POST /api/posts/comment/:postid
// 添加评论
router.post(
  "/comment/:postid",
  auth,
  check("text", "comment cannnot be empty").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { text } = req.body;
      const user = await User.findById(req.userid).select("-password");
      const post = await Post.findById(req.params.postid);
      if (!post) {
        return res.status(404).json({ msg: "post not found" });
      }
      post.comments.unshift({
        text: text,
        username: user.username,
        user: user._id,
      });
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error!");
    }
  }
);

// DELETE /api/posts/comment/:postid/:commentid
// 删除评论
router.delete("/comment/:postid/:commentid", auth, async (req, res) => {
  try {
    const { postid, commentid } = req.params;

    // check if post & comment exist
    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const comment = post.comments.find((c) => c._id.toString() === commentid);
    // console.log(post.comments);
    // console.log(commentid);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // check if user is authorized to delete
    if (comment.user.toString() !== req.userid) {
      return res.status(401).json({ msg: "This user is not authorized!" });
    }

    // delete the comment
    const removeIndex = post.comments
      .map((c) => c._id.toString())
      .indexOf(commentid);

    post.comments.splice(removeIndex, 1);
    await post.save();
    return res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error!");
  }
});

module.exports = router;
