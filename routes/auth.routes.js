const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth.middleware");

const User = require("../models/users.models");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).send({ msg: "No User" });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).send({ msg: "Invalid Email Or Password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ msg: "Invalid Email Or Password" });
      }

      const payload = {
        id: user._id,
      };

      const token = jwt.sign(payload, "himanshurahi");
      delete user._doc.password;
      res.status(200).send({ ...user._doc, token });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
