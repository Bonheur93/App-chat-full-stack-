const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require('jwt-then');

exports.register = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    const emailRejex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
    try {
        if (!emailRejex.test(email)) throw "Email nest pas supporté depuis votre domain.";
        if (password.length < 6) throw "Le mot de pass doit avoir contenir 6 caractères.";

        const userExists = await User.findOne({
            email,   
        }); 

        if (userExists) throw "Email de ce même nom existe déjà";

        const user = new User({
            name,
            email,
            password: sha256(password + process.env.SALT),
        });

        await user.save();

        res.status(201).json({
            message: "l'utilisateur [" + name + "] est enregistré avec succès",
        
        });
    } catch (error) {
        res.json({
            error
        });
    }
    

};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password: sha256(password + process.env.SALT),
    }); 

    if (!user) throw "Email et le mot de pass ne sont pas correct";
    
    const token = await jwt.sign({id: user.id}, process.env.SECRET);

    res.json({
        message: "Utilistateur est logé avec succès",
        token,
    });
};



