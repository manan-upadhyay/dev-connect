import express from "express";
const router = express.Router();

// @route    GET api/profile
// @desc     Get the Profile
// @access   Public
router.get("/", (req, res) => {
  res.send("Profile Route");
});

export default router;
