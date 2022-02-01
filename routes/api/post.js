import express from "express";
const router = express.Router();

// @route    GET api/users
// @desc     Get the Users
// @access   Public
router.get("/", (req, res) => {
  res.send("Post Route");
});

export default router;
