require("dotenv").config(); //charger les variables d'envirronement 

const mongoose = require("mongoose");
const { Socket } = require("socket.io");
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

const server = app.listen(8000, () => {
    console.log("Le server est en écoute sur le port 8000")
});

const io = require("socket.io")(server);
const jwt = require("jwt-then");



io.use(async (socket, next) => {
    const token = socket.handshake.query.token;

    // try {
    //     const payload = await jwt.verify(token, process.env.SECRET);
    //     socket.userId = payload.id;
    //     next();

    // }
    // catch (err) {}
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);

        socket.userId = payload.id;
        next();

    } catch (err) {};
});

io.on('connection', (socket)=> {
    console.log("Connecté: " + socket.userId);

    socket.on('deconnecté', ()=> {
        console.log("deconnecté: " + socket.userId);   
    });
});