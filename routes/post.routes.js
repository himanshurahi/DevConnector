const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, async (req, res) => {
  const { title, body } = req.body;
  const newPost = new Post({
    title,
    body,
    user: req.user.id,
  });

  try {
    const post = await newPost.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id }).populate("user").populate("comments.user", "username");
    if (!post) {
      return res.status(404).send({ msg: "Post Not Found" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const post = await Post.find()
      .sort({ date: -1 })
      .populate("user")
      .populate("comments.user");
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!post) {
      return res.status(404).send({ msg: "Post Not Found" });
    }
    return res.status(200).send(post);
  } catch (error) {
    console.log(error);
    if (error.kind == "ObjectId") {
      return res.status(404).send({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

router.post("/like/:id", auth, async (req, res) => {
  console.log(req.user.id);
  try {
    let post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        like: {
          $not: {
            $elemMatch: {
              user: req.user.id,
            },
          },
        },
      },
      {
        $push: {
          like: {
            user: req.user.id,
          },
        },
      },
      {
        new: true,
      }
    );

    if (!post) {
      return res.status(200).send({ msg: "You are already liked this post" });
    }
    res.status(200).send(post);
    console.log(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        like: {
          $elemMatch: {
            user: req.user.id,
          },
        },
      },
      {
        $pull: {
          like: {
            user: req.user.id,
          },
        },
      },
      {
        new: true,
      }
    );
    if (!post) {
      return res.status(200).send({ msg: "You have to like post first" });
    }
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

//Comments

router.post("/comment/:post_id", auth, async (req, res) => {
  const { body } = req.body;

  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.post_id,
      },
      {
        $push: {
          comments: {
            $each: [{ user: req.user.id, body }],
            $position: 0,
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.user", "username")
    res.status(200).send(post.comments)
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/comment/:post_id", auth, async (req, res) => {
  const { body, comment_id } = req.body;
  if(!comment_id){
    console.log('no Comment Id')
  }

  try {
    const post = await Post.findOneAndUpdate(
      {
        _id: req.params.post_id,
      },
      {
        $pull: {
          comments: {
            user: req.user.id,
            _id: comment_id,
          },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).send(post.comments);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
