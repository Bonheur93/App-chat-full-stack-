const mongoose = require ("mongoose");

exports.register = async (req, res) =>{
 const {name, email, password}= req.body;
 const emailRejex = /[@gmail.com|@yahoo.com|@hotmail.com|@live.com]$/;

 if (!emailRejex.test(email)) throw "Email nest pas supporté depuis votre domain.";
 if (password.length < 6) throw "Le mot de pass doit avoir contenir 6 caractères.";
}


exports.login = async (req, res) =>{

}

