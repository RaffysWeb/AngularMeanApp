const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const Post = require("../models/post");
const User = require("../models/user");
const Message = require("../models/message");
const config = require("../config/database");

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

//Get single post
router.post("/post/:id", (req, res, next) => {

  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return res.json({
        success: false,
        error: err
      });
    } else {
      res.json({
        success: true,
        obj: post
      });
    }
  });
});

//Protect routes
router.use('/', (req, res, next) => {
  jwt.verify(req.query.token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    console.log(decoded);
    next();
  });
});


// Post new post
router.post("/", (req, res, next) => {
  let newPost = new Post({
    user: req.body.user,
    title: req.body.title,
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
        msg: "New post added",
        _id: post._id
      });
    }
  });
});

module.exports = router;