const mongoose = require('mongoose');
const config = require('../config/database');
let User = require('./user');
// Message schema


const MessageSchema = new mongoose.Schema({
  content: {
      type: String,
      required: true
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
});

const Message = module.exports = mongoose.model('Message', MessageSchema);

module.exports.addMessage = function (newMessage, callback) {
  newMessage.save(callback);
}

