require("dotenv").config(); //charger les variables d'envirronement 

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (err) =>{
    console.log("Mongoose Connection ERROR: " + err.message);
})

const app = require('./app');

app.listen(8000, ()=>{
    console.log("Le server est en écoute sur le port 8000")
})