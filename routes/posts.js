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
  Post.findById(req.params.id)
    .populate('message')
    .exec((err, post) => {
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
    next();
  });
});


// Post new post
router.post("/", (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  const newMessage = new Message({
    content: req.body.message,
    user: decoded.data
  });
  const newPost = new Post({
    user: decoded.data,
    title: req.body.title,
    message: newMessage
  });

  Message.addMessage(newMessage, (err, message) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    }
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
        postId: post._id,
      });
    }
  });
});


// Add message to post
router.post("/post/:id/message", (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  const newMessage = new Message({
    content: req.body.message,
    user: decoded.data
  });

  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      } else {
        Message.addMessage(newMessage, (err, message) => {
          if (err) {
            res.json({
              success: false,
              error: err
            });
          }
        });
        Post.addMessage(post, newMessage, (err, post) => {
          if (err) {
            res.json({
              success: false,
              error: err
            });
          } else {
            console.log(post);
            res.json({
              success: true,
              msg: "New message added",
              postId: post._id  
            });
          }
        })
      }
    });
});

module.exports = router;