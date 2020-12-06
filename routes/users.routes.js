const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
// https://avatars.dicebear.com/api/male/himanshu.svg
router.post(
  "/",
  [
    body("username", "Username Can't be empty").notEmpty(),
    body("email", "Invalid Email").isEmail(),
    body("password", "Password Length must be greater then 5P").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    let user = await User.findOne({ email: email });

    //Check If User Exist
    try {
      if (user) {
        return res.status(400).send({ error: "User Already Exist" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
      });

      await newUser.save();

      const payload = {
        id: newUser._id,
      };

      const token = jwt.sign(payload, "himanshurahi");
      delete newUser._doc.password
      res.status(200).send({...newUser._doc, token});
    } catch (error) {
      //   console.log(error.name);
      res.status(500).send("Server Error");
    }

    // user
    //   .save()
    //   .then((resp) => {
    //     res.status(200).send(resp);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // res.send("User Route");
  }
);

router.get("/", async (req, res) => {
  const user = await User.find().populate('profile')

  res.send(user);
});

module.exports = router;
