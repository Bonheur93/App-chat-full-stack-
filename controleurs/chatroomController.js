const mongoose = require ("mongoose");
const chatroom = require('../modeles/Chatroom');


exports.createchatroom = async (res, req)=>{
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
    
    if(!nameRegex.test(name)) throw "Le nom ne peut que contenir les alphabets.";

    const chatroomExists = await chatroom.findOne({ name });


    if(chatroomExists) throw "Chatroom existe déjà avec ce nom";

    const chatroom = new chatroom ({
        name,
    });
    await chatroom.save();

    res.json({
        message: "chatroom est crée!"
    });
};