import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import authMiddleware from "../../middleware/authMiddleware.js";
import User from "../../models/User.js";
const router = express.Router();

// @route    GET api/auth
// @desc     Auth Route
// @access   Public
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "Invalid User" });
    }

    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error..." });
  }
});

// @route    POST api/auth
// @desc     Authenticate Users & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User does not exist!" }] });
      }

      if (!(await user.matchPassword(password))) {
        return res.status(401).json({ errors: [{ msg: "Invalid Password" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
