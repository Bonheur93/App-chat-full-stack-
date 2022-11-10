const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const chatroomController = require("../controleurs/chatroomController");

const author = require("../middlewares/author");

router.post("/", author, catchErrors(chatroomController.createChatroom));

  

module.exports = router;