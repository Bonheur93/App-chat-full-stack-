const mongoose = require("mongoose");

const chatroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: 'Le nom est obligatoire'
    },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);