const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const Post = require("../models/post");
const User = require("../models/user");
const Message = require("../models/message");
const config = require("../config/database");

// Get posts
router.get("/", (req, res, next) => {
  Post.find()
    .populate({
      path: 'user',
      select: 'username'
    })
    .exec((err, posts) => {
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
    .populate({
      path: 'message',
      populate: {
        path: 'user ',
        select: 'username',
        model: 'User'
      }
    })
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

    Post.addPost(newPost, (err, post) => {
      if (err) {
        res.json({
          success: false,
          error: err
        });
      }

      User.findById(decoded.data._id)
        .exec((err, user) => {
          if (err) {
            res.json({
              success: false,
              error: err
            });
          } else {
            User.addPost(user, newPost, newMessage, (err, user) => {
              if (err) {
                res.json({
                  success: false,
                  error: 'err'
                });
              } else {
                res.json({
                  success: true,
                  msg: "User updated",
                  postId: post._id
                });
              }
            })
          }
        });
    });
  });
});

// Add message to post
router.post("/post/:id/message", (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  const newMessage = new Message({
    content: req.body.message,
    user: decoded.data,
    post: req.params.id
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
            User.findById(decoded.data._id)
              .exec((err, user) => {
                if (err) {
                  res.json({
                    success: false,
                    error: err
                  });
                } else {
                  User.addMessage(user, newMessage, (err, user) => {
                    if (err) {
                      res.json({
                        success: false,
                        error: 'err'
                      });
                    } else {
                      res.json({
                        success: true,
                        msg: "User updated",
                        postId: post._id
                      });
                    }
                  })
                }
              });
          }
        })
      }
    });
});

// Get Message
router.get("/message/:id", (req, res, next) => {
  Message.findById(req.params.id)
    .exec((err, message) => {
      if (err) {
        return res.json({
          success: false,
          error: err
        });
      } else {
        res.json({
          success: true,
          obj: message
        });
      }
    });
});

// Edit Message
router.patch('/message/:id', function (req, res, next) {
  let decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.json({
        success: false,
        error: err
      });
    }
    if (!message) {
      return res.json({
        success: false,
        error: err
      });
    }
    if (message.user != decoded.data._id) {
      return res.json({
        success: false,
        error: err
      });
    }
    message.content = req.body.content;
    message.save(function (err, message) {
      if (err) {
        return res.json({
          success: false,
          error: err
        });
      }
      res.json({
        success: true,
        obj: message
      });
    });
  });
});


// Delete Message
router.delete('/message/:id', (req, res, next) => {
  let decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      res.json({
        success: false,
        error: err
      });
    } else {
      if (message.user != decoded.data._id) {
        return res.status(401).json({
          success: false,
          error: err
        });
      }
      User.findById(message.user, (err, user) => {
        user.messages.pull(message);
        user.save();
      })
      message.remove((err, result) => {
        if (err) {
          res.json({
            success: false,
            error: err
          });
        } else {
          res.json({
            success: true,
            msg: result
          })
        }
      });
    }
  });
});


module.exports = router;