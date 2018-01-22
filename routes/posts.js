const express = require("express");
const router = express.Router();

const Post = require("../models/post");
const User = require("../models/user");
const Message = require("../models/message");

// Get posts
router.get("/", (req, res, next) => {
  Post.find().exec((err, posts) => {
    if (err) {
      return res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        obj: posts
      });
    }
  });
});

// Post new post
router.post("/", (req, res, next) => {
  let newPost = new Post({
    user: req.body.user,
    message: req.body.message
  });

  Post.addPost(newPost, (err, post) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        msg: "New post added"
      });
    }
  });
});

module.exports = router;
