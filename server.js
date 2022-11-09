require("dotenv").config(); //charger les variables d'envirronement 

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.connection.on("error", (err) =>{
    console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open",()=>{
    console.log("MongoDb est connecté!")
} );


require("./modeles/User");
require ("./modeles/Chatroom");
require("./modeles/Message");



const app = require('./app');

app.listen(8000, ()=>{
    console.log("Le server est en écoute sur le port 8000")
});
