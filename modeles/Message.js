const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Le chatroom est obligatoire",
        ref: "chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "chatroom ",
        ref: "User",
    },
    message:{
        type: String,
        required: "Le message est obligatoire",
    }
});

module.exports = mongoose.model("Message", messageSchema);