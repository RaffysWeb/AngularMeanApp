// const express = require("express");
// const router = express.Router();
// const Message = require("../models/message");

// // Get messages
// router.get("/", (req, res, next) => {
//   Message.find().exec((err, messages) => {
//     if (err) {
//       return res.json({
//         success: false,
//         error: err
//       });
//     } else {
//       res.json({
//         success: true,
//         obj: messages
//       });
//     }
//   });
// });

// // Post new message
// router.post("/", (req, res, next) => {
//   let newMessage = new Message({
//     content: req.body.message
//   });
  
//   Message.addMessage(newMessage, (err, message) => {
//     if (err) {
//       res.json({
//         success: false,
//         error: err
//       });
//     } else {
//       res.json({
//         success: true,
//         msg: "New message added"
//       });
//     }
//   });
// });

// module.exports = router;
