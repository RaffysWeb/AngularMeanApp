const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');
const Post = require('./post');



// Message schema
let MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

MessageSchema.post('remove', (message) => {
  Post.findById(message.post, (err, post) => {
      post.message.pull(message)
      post.save();
  });
});


const Message = module.exports = mongoose.model('Message', MessageSchema);







module.exports.addMessage = function (newMessage, callback) {
  newMessage.save(callback);
}