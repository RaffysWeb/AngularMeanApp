const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.post("/post", (req, res, next) => {
  let newMessage = new Message({
    content: req.body.message
  });

  Message.addMessage(newMessage, (err, message) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Failed to add new Message'
      });
    } else {
      res.json({
        success: true,
        msg: 'New message added'
      });
    }
  })

});



module.exports = router;
