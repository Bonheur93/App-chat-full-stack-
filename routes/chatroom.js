const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const chatroomController = require("../controleurs/chatroomController");

const author = require("../middlewares/author");
const { route } = require("../app");

router.get ("/", author, catchErrors(chatroomController.getAllChatrooms));
router.post("/", author, catchErrors(chatroomController.createchatroom));
router.post("/", author,  catchErrors (chatroomController.createchatroom));

  

module.exports = router;