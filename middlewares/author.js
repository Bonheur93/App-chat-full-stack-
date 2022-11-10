const jwt = require("jwt-then");

module.exports = async (req, res, next) => {
    try{
        if(req.header.authorization) throw "interdit!"
        const token = req.header.authorization.split("")[1];

    const payload = await jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();

    }catch(err){
        res.status(401).json({
            message: "Interdit!!!",
        })

    };
};