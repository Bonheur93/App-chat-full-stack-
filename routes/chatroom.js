const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const chatroomController = require("../controleurs/chatroomController");

const author = require(".../middleware/author");

router.post("/", author, catchErrors(chatroomController.createChatroom));

  

module.exports = router;