import express from "express";
import authMiddleware from "../../middleware/authMiddleware.js";
import { check, validationResult } from "express-validator";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Profile from "../../models/Profile.js";
const router = express.Router();

// @route    POST api/post
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [authMiddleware, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/post
// @desc     Get all the posts
// @access   Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/post/:id
// @desc     Get post by id
// @access   Private
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
