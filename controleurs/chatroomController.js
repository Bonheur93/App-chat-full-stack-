const mongoose = require ("mongoose");
const chatroom = mongoose.model("chatroom");


exports.createchatroom = async (res, req)=>{
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    const chatroom = new chatroom ({
        name,
    });
    await chatroom.save();

    res.json({
        message: "chatroom est crée!"
    });
};