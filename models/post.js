const mongoose = require('mongoose');
const express = require('express');
const User = require('./user');
const Message = require('./message');

// Post Schema
const PostSchema = new mongoose.Schema({
  title: {
    type: String
  },
  message: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = function (newPost, callback) {
  newPost.message.push();
  newPost.save(callback);
}

module.exports.addMessage = function (post, newMessage, callback) {
  post.message.push(newMessage);
  post.save(callback);
}

