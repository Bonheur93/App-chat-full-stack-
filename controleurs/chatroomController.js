const mongoose = require ("mongoose");
const Chatroom = require('../modeles/Chatroom');
const Message = require('../modeles/Message');

//create chatroom
exports.createchatroom = async (req, res)=>{
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
    
    if(!nameRegex.test(name)) throw "Le nom ne peut que contenir les alphabets.";

    const chatroomExists = await Chatroom.findOne({ name });
    console.log(chatroomExists);

    if(chatroomExists) throw "Chatroom existe déjà avec ce nom";

    const chatroom = new Chatroom ({
        name,
    });
    await chatroom.save();

    res.json({
        message: "chatroom est crée!"
    });

    const message = new Message({
        message:"Commencez la discussion!"
    });
};


exports.getAllChatrooms = async(req, res)=> {
    try {
        const chatrooms = await Chatroom.find({});
        console.log(chatrooms);
        res.json(chatrooms);
    } catch (error) {
        console.log(error)
    }
    // const chatrooms = await Chatroom.find({});
    // res.json(chatrooms);
};


