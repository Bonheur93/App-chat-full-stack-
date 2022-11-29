require("dotenv").config(); //charger les variables d'envirronement 

const mongoose = require("mongoose");
// const { Socket } = require("socket.io");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
    console.log("MongoDb est connecté!")
});


require("./modeles/User");
require("./modeles/Chatroom");
require("./modeles/Message");




const app = require('./app');

const server = app.listen(8001, () => {
    console.log("Le server est en écoute sur le port 8001")
});

const io = require("socket.io")(server, {
    allowEI03: true,
    cors: {
        origin:true,
        methods:["GET", "POST"],
        credentials: true,
    },
});

const jwt = require("jwt-then");

const Message = mongoose.model("Message");
const User = mongoose.model("User");




io.use(async (socket, next) => {
   
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);

        socket.userId = payload.id;
        next();

    } catch (err) {}
});

io.on('connection', (socket)=> {
    console.log("Connected: " + socket.userId + ':' + socket.id);

    socket.on('Disconnect', ()=> {
        console.log("deconnecté: " + socket.userId);   
    });

  socket.on("joinRoom",({chatroomId}) => {
    socket.join(chatroomId);
    console.log('Un utilisateur vient de joindre le salon:' + chatroomId)
  });

  socket.on("leaveRoom",({chatroomId}) => {
    socket.leave(chatroomId);
    console.log('Un utilisateur vient de quitter le salon:' + chatroomId)
  });


  socket.on("chatroomMessage", async ({chatroomId, message}) => {
    if(message.trim().length > 0){
        const user = await User.findOne({ _id: socket.userId});
        const newMessage = new Message({
            chatroom: chatroomId,
            user: socket.userId,
            message,
        });

        io.to(chatroomId).emit("newMessage", {
            message,
            name: user.name,
            userId: socket.userId,
        });

        await newMessage.save();
    }
  
  });
});