const express = require("express");
const router = express.Router();
const Profile = require("../models/profiles.models");
const auth = require("../middleware/auth.middleware");
const { body, validationResult } = require("express-validator");
const User = require("../models/users.models");
const request = require("request");

router.get("/me", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["username", "email"]
  );

  res.status(200).send(profile);
});

router.post(
  "/",
  [
    body("website", "Please Provide Wesbite").notEmpty(),
    body("location", "Please Provide Location").notEmpty(),
    body("bio", "Please Provide Bio").notEmpty(),
    body("skills", "Please Provide Skills").notEmpty(),
    body("status", "Please Provide status").notEmpty(),
    body("company", "Please Provide Company").notEmpty(),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      website,
      location,
      bio,
      skills,
      status,
      githubusername,
      company,
      facebook,
      instagram,
    } = req.body;

    const newObj = {
      website,
      location,
      bio,
      skills: skills.split(",").map((el) => el.trim()),
      status,
      githubusername,
      company,
      social: { facebook, instagram },
      user: req.user.id,
    };

    //   const user = await Profile.findOneAndUpdate(
    //     { _id: id },
    //     { newObj },
    //     { new: true }
    //   );
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: newObj,
          },
          { new: true }
        );
        return res.status(200).send(profile);
      }


      profile = new Profile(newObj);
      await profile.save();
      return res.status(200).send(profile);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', "-password");
    res.status(200).send(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', '-password');
    if (!profiles) {
      return res.status(404).send({ msg: "User Not Found" });
    }
    return res.status(200).send(profiles);
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.status(500).send({ msg: "User Not Found" });
    }
  }
});

router.delete("/", async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.status(200).send({ msg: "User Deleted" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong." });
  }
});

router.patch(
  "/experience",
  [
    body("title", "Title Required").notEmpty(),
    body("company", "Company Required").notEmpty(),
    body("from", "Date Required").notEmpty(),
    body("location", "Location Required").notEmpty(),
    body("current", "current Required").notEmpty(),
  ],
  auth,
  async (req, res) => {
    const { title, company, from, to, current } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            experience: {
              $each: [{ title, company, from, to, current }],
              $position: 0,
            },
          },
        },
        { new: true }
      );

      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send({ msg: "Something went wrong." });
    }
  }
);

router.delete("/experience/:exp_id", auth, async (req, res) => {
  const { exp_id } = req.params;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          experience: { _id: exp_id },
        },
      },
      { new: true }
    );

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong." });
  }
});

//Education

router.patch(
  "/education",
  [
    body("education", "Education Title Required").notEmpty(),
    body("course", "Course Required").notEmpty(),
    body("specialization", "specialization Required").notEmpty(),
    body("university", "university Required").notEmpty(),
    body("passing_year", "passing year  Required").notEmpty(),
  ],
  auth,
  async (req, res) => {
    const {
      education,
      course,
      specialization,
      university,
      passing_year,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            education: {
              $each: [
                { education, course, specialization, university, passing_year },
              ],
              $position: 0,
            },
          },
        },
        { new: true }
      );

      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send({ msg: "Something went wrong." });
    }
  }
);

router.delete("/education/:edu_id", auth, async (req, res) => {
  const { edu_id } = req.params;
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        $pull: {
          education: { _id: edu_id },
        },
      },
      { new: true }
    );

    res.status(200).send(profile);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong." });
  }
});

//GITHUB

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=12&client_secret=12`,
      headers: { "user-agent": "node.js" },
    };
    request.get(options, (error, resp) => {
      if (resp.statusCode != 200) {
        return res.status(404).send({ msg: "No Github Profile Found." });
      }

      return res.status(200).send(JSON.parse(resp.body));
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong." });
  }
});

module.exports = router;
