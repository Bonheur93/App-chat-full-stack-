const router = require("express").Router();
const {catchErrors} = require("../handlers/errorHandlers");
const chatroomController = require("../controleurs/chatroomController");
// const PrivateMessages = require("../controleurs/PrivateMessages")

const author = require("../middlewares/author");
// const { route } = require("../app");

router.get ("/", author, catchErrors(chatroomController.getAllChatrooms));
router.post("/", author, catchErrors(chatroomController.createchatroom));
// router.post("/", author,  catchErrors (PrivateMessages.PostMessage));
// router.post("/", author,  catchErrors (PrivateMessages.ReadMessages));

  

module.exports = router;