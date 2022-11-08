const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Le nom est obligatoire'
    },
    email: {
        type: String,
        required: 'Email est obligatoire'
    },
    password: {
        type: String,
        required: 'Le mot de pass est obligatoire'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);